import asyncio
from typing import Optional


class RealtimeOrchestrator:

    def __init__(self, stt_stream, llm, tts, websocket):
        self.stt_stream = stt_stream
        self.llm = llm
        self.tts = tts
        self.ws = websocket

        self.running = True
        self.current_language = "en-IN"

        self.last_text = ""
        self.is_speaking = False
        self.llm_task: Optional[asyncio.Task] = None
        self.tts_task: Optional[asyncio.Task] = None
        self.system_prompt = """
            You are a real-time voice assistant.

            Rules:
            - Respond naturally like a human
            - Keep answers short (2-3 sentences)
            - Always reply in SAME language as user
            - Do NOT translate
            - Be clear and helpful
            """

    # -------------------------
    # ENTRYPOINT
    # -------------------------
    
    async def _send_greeting(self):
        greeting = "Hello! How can I assist you?"

        # send to UI
        await self.ws.send_json({
            "type": "assistant",
            "text": greeting
        })

        # speak it
        self.tts_task = asyncio.create_task(
            self._run_tts(greeting, self.current_language)
    )
    async def start(self):
    # ✅ FIRST MESSAGE FROM AI
        await self._send_greeting()

        # then start listening
        stt_task = asyncio.create_task(self._run_stt())

        try:
            await asyncio.Future()  # 🔥 zero latency idle
        except asyncio.CancelledError:
            print("[ORCH STOPPED CLEANLY]")
        finally:
            await self._shutdown(stt_task)

    # -------------------------
    # STT LOOP
    # -------------------------
    async def _run_stt(self):
        async for data in self.stt_stream.run(self.ws):
            text = data["text"]
            self.current_language = data["language"]

            print("[STT]:", text)
            await self._handle_text(text)

    # -------------------------
    # INPUT HANDLER
    # -------------------------
    async def _handle_text(self, text: str):
        text = text.strip()

        # ignore noise / duplicates
        if len(text) < 2 or text == self.last_text:
            return

        self.last_text = text

        # send user message immediately (UI sync)
        await self.ws.send_json({
            "type": "user",
            "text": text
        })

        print("[LLM TRIGGER]:", text)

        # ⚡ HARD INTERRUPT LLM (low latency)
        if self.llm_task and not self.llm_task.done():
            self.llm_task.cancel()
            try:
                await self.llm_task
            except:
                pass


        # freeze language (avoid race condition)
        lang = self.current_language

        self.llm_task = asyncio.create_task(
            self._run_llm(text, lang)
        )

    # -------------------------
    # LLM STREAM
    # -------------------------
    async def _run_llm(self, text: str, lang: str):
            print("[LLM START]")

            full_text = ""

            try:
                prompt = f"""
        {self.system_prompt}

        User: {text}
        Assistant:
        """

                async for token in self.llm.stream(prompt):
                    full_text += token

                print("[LLM DONE]:", full_text)

                await self.ws.send_json({
                    "type": "assistant",
                    "text": full_text
                })

                if self.tts_task and not self.tts_task.done():
                    print("[TTS] ⚠️ already running → skip")
                    return

                self.tts_task = asyncio.create_task(
                    self._run_tts(full_text, lang)
                )

            except asyncio.CancelledError:
                print("[LLM CANCELLED]")

    # -------------------------
    # TTS STREAM
    # -------------------------
    async def _run_tts(self, text: str, lang: str):
        self.is_speaking= True
        print("[TTS START]")
        try:
            async for audio in self.tts.stream(
                text,
                language=lang
            ):
                await self.ws.send_bytes(audio)

            print("[TTS] ✅ COMPLETED")

        except asyncio.CancelledError:
            print("[TTS] ❌ CANCELLED")
        finally:
            self.is_speaking = False

    # -------------------------
    # SHUTDOWN
    # -------------------------
    async def _shutdown(self, *tasks):
        print("[ORCH SHUTDOWN]")

        for task in tasks:
            task.cancel()

        if self.llm_task:
            self.llm_task.cancel()

        if self.tts_task:
            self.tts_task.cancel()

        await asyncio.gather(*tasks, return_exceptions=True)