from src.infrastructure.observability.timer import Timer


class VoiceService:

    def __init__(self, llm, stt, tts):
        self.llm = llm
        self.stt = stt
        self.tts = tts

    # -------------------------
    # STT
    # -------------------------
    async def speech_to_text(self, audio_bytes: bytes) -> str:
        if not audio_bytes or len(audio_bytes) < 1000:
            return ""

        with Timer("STT_TOTAL", "voice"):
            return await self.stt.transcribe(audio_bytes)

    # -------------------------
    # LLM
    # -------------------------
    async def generate_response(self, prompt: str) -> str:
        if not prompt:
            return ""

        with Timer("LLM_TOTAL", "voice"):
            return await self.llm.generate(prompt)

    # -------------------------
    # TTS (NO MP3 / NO STORAGE)
    # -------------------------
    async def text_to_speech(self, text: str, language: str, voice: str) -> bytes:
        if not text:
            return b""

        with Timer("TTS_TOTAL", "voice"):
            return await self.tts.synthesize(text, language, voice)