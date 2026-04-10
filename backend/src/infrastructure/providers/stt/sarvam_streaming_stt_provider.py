import base64
from sarvamai import AsyncSarvamAI


class SarvamStreamingSTTProvider:

    def __init__(self, api_key: str):
        self.client = AsyncSarvamAI(
            api_subscription_key=api_key
        )

    def get_connection(self):
        """
        Return context manager (NOT awaited)
        """
        return self.client.speech_to_text_streaming.connect(
            model="saaras:v3",
            mode="transcribe",
            language_code="en-IN",
            sample_rate=16000,
            input_audio_codec="pcm_s16le",
            high_vad_sensitivity=True,
            vad_signals=True,
        )


class SarvamWSConnection:

    def __init__(self, ws):
        self.ws = ws

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        await self.ws.close()

    async def transcribe(self, audio: bytes):

        audio_b64 = base64.b64encode(audio).decode("utf-8")

        await self.ws.transcribe(
            audio=audio_b64,
            encoding="audio/pcm",
            sample_rate=16000,
        )

    async def recv(self):

        async for message in self.ws:
            return message

        return {}