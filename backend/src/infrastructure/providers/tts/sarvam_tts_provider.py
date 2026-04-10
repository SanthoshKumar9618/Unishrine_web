import asyncio
import requests
import base64
from typing import AsyncGenerator
from src.config.settings import settings


class SarvamTTSProvider:
    def __init__(self):
        self.url = "https://api.sarvam.ai/text-to-speech"
        self.api_key = settings.SARVAM_API_KEY

    async def stream(self, text: str, language: str = "en-IN") -> AsyncGenerator[bytes, None]:

        if not text or not str(text).strip():
            return

        payload = {
            "inputs": [text],
            "target_language_code": language,
            "speaker": "vidya"
        }

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        response = requests.post(self.url, json=payload, headers=headers)

        if response.status_code != 200:
            print("TTS ERROR:", response.text)
            return

        # ✅ FIX: Parse JSON + decode base64
        data = response.json()

        base64_audio = data["audios"][0]
        audio_bytes = base64.b64decode(base64_audio)

        print("[TTS AUDIO BYTES]:", len(audio_bytes))

        # ✅ SEND FULL WAV BUFFER
        yield audio_bytes