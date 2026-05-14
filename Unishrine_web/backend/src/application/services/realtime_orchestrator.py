import asyncio
from typing import Optional
from src.domain.config.language_rules import get_language_instruction
from src.domain.config.greetings import  get_dynamic_greeting
from src.domain.config.assistant_prompts import ASSISTANT_PROMPTS

class RealtimeOrchestrator:
    def __init__(self, stt_stream, llm, tts, websocket):
        self.stt_stream = stt_stream
        self.llm = llm
        self.tts = tts
        self.ws = websocket

        self.running = True

        # =====================================
        # DYNAMIC SESSION CONFIG (FROM FRONTEND)
        # =====================================
        self.current_language = "en-IN"
        self.selected_voice = "female_1"
        self.assistant_type = "insurance_advisor"
        self.system_prompt = ""

        self.last_text = ""
        self.is_speaking = False
        self.pending_user_text = ""
        self.pause_task: Optional[asyncio.Task] = None
        self.conversation_history = []
        # Human-like pause settings
        self.reply_delay_seconds = 2
        self.min_text_length = 3

        self.llm_task: Optional[asyncio.Task] = None
        self.tts_task: Optional[asyncio.Task] = None

    # =====================================
    # STEP 1: RECEIVE SESSION CONFIG FIRST
    # =====================================
    async def initialize_session(self):
        """
        First websocket message must be:
        {
            type: "session_config",
            language,
            voice,
            assistant_type,
            prompt
        }
        """

        try:
            data = await self.ws.receive_json()

            if data.get("type") != "session_config":
                print("[CONFIG] Invalid first message")
                return

            language_map = {
                "English": "en-IN",
                "Telugu": "te-IN",
                "Hindi": "hi-IN",
                "Kannada": "kn-IN",
            }

            self.current_language = language_map.get(
                data.get("language"),
                "en-IN",
            )

            self.selected_voice = data.get(
                "voice",
                "female_1",
            )

            self.assistant_type = data.get(
                "assistant_type",
                "insurance_advisor",
            )
            self.system_prompt = ASSISTANT_PROMPTS.get(
                self.assistant_type,
                "You are a helpful assistant."
            )

            print("\n========== SESSION CONFIG ==========")
            print("Language:", self.current_language)
            print("Voice:", self.selected_voice)
            print("Assistant:", self.assistant_type)
            print("====================================\n")

        except Exception as e:
            print("[SESSION CONFIG ERROR]:", e)
    

    # =====================================
    # GREETING
    # =====================================
    async def _send_greeting(self):
        """
        Dynamic greeting based on:
        - assistant_type
        - selected language
        - selected frontend voice

        Example:
        male_1 -> Abhilash
        female_1 -> Vidya
        female_2 -> Manisha
        """

        greeting = get_dynamic_greeting(
            assistant_type=self.assistant_type,
            language_code=self.current_language,
            selected_voice=self.selected_voice,
        )

        print("\n========== GREETING ==========")
        print("Assistant Type:", self.assistant_type)
        print("Language:", self.current_language)
        print("Selected Voice:", self.selected_voice)
        print("Greeting:", greeting)
        print("================================\n")

        # send greeting text to frontend UI
        await self.ws.send_json({
            "type": "assistant",
            "text": greeting,
        })

        # convert greeting text -> voice audio
        self.tts_task = asyncio.create_task(
            self._run_tts(
                greeting,
                self.current_language,
            )
        )
    # =====================================
    # ENTRYPOINT
    # =====================================
    async def start(self):
        # STEP 1 → receive frontend config first
        await self.initialize_session()

        # STEP 2 → first assistant greeting
        await self._send_greeting()

        # STEP 3 → start STT loop
        stt_task = asyncio.create_task(
            self._run_stt()
        )

        try:
            await asyncio.Future()  # keep alive

        except asyncio.CancelledError:
            print("[ORCH STOPPED CLEANLY]")

        finally:
            await self._shutdown(stt_task)

    # =====================================
    # STT LOOP
    # =====================================
    async def _run_stt(self):
        async for data in self.stt_stream.run(
            self.ws,
            language_code=self.current_language,
        ):
            text = data["text"]

            detected_language = data["language"]

            print(
                "[STT DETECTED LANGUAGE]:",
                detected_language
            )

            print("[STT]:", text)
            await self._handle_text(text)
    # =====================================
    # HANDLE USER TEXT
    # =====================================
    async def _handle_text(self, text: str):
        text = text.strip()

        if len(text) < self.min_text_length:
            return

        if text == self.last_text:
            return

        self.last_text = text

        await self.ws.send_json({
            "type": "user",
            "text": text,
        })
        self.conversation_history.append(
                f"User: {text}"
            )

        print("[USER SPEECH]:", text)

        # stop frontend current audio immediately
        await self.ws.send_json({
            "type": "interrupt"
        })

        # cancel old waiting pause
        if self.pause_task and not self.pause_task.done():
            self.pause_task.cancel()
            try:
                await self.pause_task
            except:
                pass

        # cancel old TTS immediately
        if self.tts_task and not self.tts_task.done():
            print("[TTS INTERRUPTED]")
            self.tts_task.cancel()
            try:
                await self.tts_task
            except:
                pass

        # cancel old LLM if still generating
        if self.llm_task and not self.llm_task.done():
            print("[LLM INTERRUPTED]")
            self.llm_task.cancel()
            try:
                await self.llm_task
            except:
                pass

        # important:
        # merge user continuation instead of overwrite
        if self.pending_user_text:
            self.pending_user_text += " " + text
        else:
            self.pending_user_text = text

        # wait 2 sec before final reply
        self.pause_task = asyncio.create_task(
            self._delayed_reply()
        )
        
        
    async def _delayed_reply(self):
        try:
            print("[WAITING 2 SEC BEFORE REPLY]")

            await asyncio.sleep(2)

            if not self.pending_user_text:
                return

            final_text = self.pending_user_text
            self.pending_user_text = ""

            print("[FINAL USER INPUT]:", final_text)

            self.llm_task = asyncio.create_task(
                self._run_llm(
                    final_text,
                    self.current_language
                )
            )

        except asyncio.CancelledError:
            print("[USER CONTINUED SPEAKING]")
       
        
    

    # =====================================
    # LLM STREAM
    # =====================================
    async def _run_llm(self, text: str, lang: str):
        print("[LLM START]")

        full_text = ""
        sentence_buffer = ""

        language_instruction = get_language_instruction(lang)

        try:
            recent_history = "\n".join(
                self.conversation_history[-6:]
            )

            prompt = f"""
    SYSTEM:
    {language_instruction}

    BUSINESS ROLE:
    {self.system_prompt}

    CONVERSATION HISTORY:
    {recent_history}

    LATEST USER MESSAGE:
    {text}

    IMPORTANT:
    - Do not repeat already answered questions
    - Continue naturally from previous context
    - Ask only the next required question
    - Never assume user details that were not explicitly provided
    - If information is missing, politely ask for clarification
    - If the user has not shared their name, do not use any name
    - Do not guess customer information
    - Only use facts explicitly stated by the user

    ASSISTANT RESPONSE:
    """

            async for token in self.llm.stream(prompt):

                full_text += token
                sentence_buffer += token

                # realtime UI streaming
                await self.ws.send_json({
                    "type": "assistant_stream",
                    "text": token,
                })

                # sentence boundary detection
                if token in [".", "?", "!", "\n"]:

                    chunk = sentence_buffer.strip()

                    if chunk:

                        print("[TTS CHUNK]:", chunk)

                        # start speaking immediately
                        asyncio.create_task(
                            self._run_tts(chunk, lang)
                        )

                    sentence_buffer = ""

            # remaining partial text
            if sentence_buffer.strip():

                asyncio.create_task(
                    self._run_tts(
                        sentence_buffer.strip(),
                        lang
                    )
                )

            print("[LLM DONE]:", full_text)

            self.conversation_history.append(
                f"Assistant: {full_text}"
            )

            # final complete response
            await self.ws.send_json({
                "type": "assistant",
                "text": full_text,
            })

        except asyncio.CancelledError:
            print("[LLM CANCELLED]")

    # =====================================
    # TTS STREAM
    # =====================================
    async def _run_tts(self, text: str, lang: str):
        self.is_speaking = True
        print("[TTS START]")

        try:
            async for audio in self.tts.stream(
                text,
                language=lang,
                voice=self.selected_voice,
            ):
                await self.ws.send_bytes(audio)

            print("[TTS COMPLETED]")

        except asyncio.CancelledError:
            print("[TTS CANCELLED]")

        finally:
            self.is_speaking = False

    # =====================================
    # CLEAN SHUTDOWN
    # =====================================
    async def _shutdown(self, *tasks):
        print("[ORCH SHUTDOWN]")

        for task in tasks:
            task.cancel()

        if self.llm_task:
            self.llm_task.cancel()

        if self.tts_task:
            self.tts_task.cancel()

        await asyncio.gather(
            *tasks,
            return_exceptions=True,
        )
