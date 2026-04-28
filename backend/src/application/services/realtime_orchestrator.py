import asyncio
from typing import Optional
from src.domain.config.language_rules import get_language_instruction
from src.domain.config.greetings import GREETING_MAP
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
        

        greeting = GREETING_MAP.get(
            self.assistant_type,
            {}
        ).get(
            self.current_language,
            "Hello! How can I assist you today?"
        )

        await self.ws.send_json({
            "type": "assistant",
            "text": greeting,
        })

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

        if len(text) < 2 or text == self.last_text:
            return

        self.last_text = text

        await self.ws.send_json({
            "type": "user",
            "text": text,
        })

        print("[LLM TRIGGER]:", text)

# tell frontend to stop currently playing audio
        await self.ws.send_json({
            "type": "interrupt"
        })

        # stop old TTS
        if self.tts_task and not self.tts_task.done():
            print("[TTS INTERRUPT] stopping old speech")

            self.tts_task.cancel()

            try:
                await self.tts_task
            except Exception:
                pass

        # stop old LLM
        if self.llm_task and not self.llm_task.done():
            self.llm_task.cancel()

            try:
                await self.llm_task
            except Exception:
                pass
        lang = self.current_language

        self.llm_task = asyncio.create_task(
            self._run_llm(text, lang)
        )

    # =====================================
    # LLM STREAM
    # =====================================
    async def _run_llm(self, text: str, lang: str):
        print("[LLM START]")

        full_text = ""
        language_instruction = get_language_instruction(lang)
        try:
            prompt = f"""
            SYSTEM:

            {language_instruction}

            BUSINESS ROLE:
            {self.system_prompt}

            USER MESSAGE:
            {text}

            ASSISTANT RESPONSE:
            """

            async for token in self.llm.stream(prompt):
                full_text += token

            print("[LLM DONE]:", full_text)

            await self.ws.send_json({
                "type": "assistant",
                "text": full_text,
            })

            

            self.tts_task = asyncio.create_task(
                self._run_tts(full_text, lang)
            )

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
