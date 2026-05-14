# src/infrastructure/providers/tts/sarvam_tts_provider.py

import requests
import base64
from typing import AsyncGenerator
from src.config.settings import settings


class SarvamTTSProvider:
    def __init__(self):
        self.url = "https://api.sarvam.ai/text-to-speech"
        self.api_key = settings.SARVAM_API_KEY

        # frontend voice -> Sarvam speaker mapping
        # KEEP THIS AS-IS (this is correct)
        self.voice_map = {
            "male_1": "abhilash",
            "female_1": "vidya",
            "female_2": "manisha",
        }

    async def stream(
        self,
        text: str,
        language: str = "en-IN",
        voice: str = "female_1",
    ) -> AsyncGenerator[bytes, None]:

        if not text or not str(text).strip():
            return

        # frontend selected voice -> actual Sarvam speaker
        selected_speaker = self.voice_map.get(
            voice,
            "vidya"
        )

        payload = {
            "inputs": [text],
            "target_language_code": language,
            "speaker": selected_speaker,
        }

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        print("\n========== TTS REQUEST ==========")
        print("Language:", language)
        print("Frontend Voice:", voice)
        print("Sarvam Speaker:", selected_speaker)
        print("=================================\n")

        try:
            response = requests.post(
                self.url,
                json=payload,
                headers=headers,
                timeout=60,
            )

            if response.status_code != 200:
                print("TTS ERROR:", response.text)
                return

            data = response.json()

            if not data.get("audios"):
                print("TTS ERROR: No audio returned")
                return

            base64_audio = data["audios"][0]
            audio_bytes = base64.b64decode(base64_audio)

            print("[TTS AUDIO BYTES]:", len(audio_bytes))

            yield audio_bytes

        except Exception as e:
            print("TTS Exception:", str(e))
            return