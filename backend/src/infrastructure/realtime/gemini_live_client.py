import json
import base64
import websockets


class GeminiLiveClient:

    def __init__(self, api_key: str):

        self.api_key = api_key
        self.ws = None

    # =====================================
    # CONNECT TO GEMINI LIVE
    # =====================================
    async def connect(self):

        url = (
            "wss://generativelanguage.googleapis.com/ws/"
            "google.ai.generativelanguage.v1alpha."
            "GenerativeService.BidiGenerateContent"
            f"?key={self.api_key}"
        )

        self.ws = await websockets.connect(url)

        setup_message = {
            "setup": {
                "model": (
                    "gemini-2.5-flash-native-audio-preview-12-2025"
                ),

                "generation_config": {
                    "response_modalities": [
                        "AUDIO"
                    ]
                },

                "input_audio_transcription": {},

                "output_audio_transcription": {},

                "realtime_input_config": {
                    "automatic_activity_detection": {
                        "disabled": False
                    }
                }
            }
        }

        await self.ws.send(
            json.dumps(setup_message)
        )

        response = await self.ws.recv()

        print("\n========== GEMINI CONNECTED ==========")
        print(response)
        print("======================================\n")

    # =====================================
    # SEND AUDIO CHUNKS
    # =====================================
    async def send_audio(
        self,
        audio_bytes: bytes
    ):

        audio_message = {
            "realtime_input": {
                "media_chunks": [
                    {
                        "mime_type": "audio/pcm",

                        "data": base64.b64encode(
                            audio_bytes
                        ).decode()
                    }
                ]
            }
        }

        await self.ws.send(
            json.dumps(audio_message)
        )

    # =====================================
    # SEND TEXT
    # =====================================
    async def send_text(
        self,
        text: str
    ):

        message = {
            "client_content": {
                "turns": [
                    {
                        "role": "user",

                        "parts": [
                            {
                                "text": text
                            }
                        ]
                    }
                ],

                "turn_complete": True
            }
        }

        await self.ws.send(
            json.dumps(message)
        )

    # =====================================
    # RECEIVE EVENTS
    # =====================================
    async def receive(self):

        async for message in self.ws:

            try:

                parsed = json.loads(message)

                print("\n========== GEMINI EVENT ==========")
                print(parsed)
                print("==================================\n")

                yield parsed

            except Exception as e:

                print(
                    "[GEMINI PARSE ERROR]:",
                    e
                )

    # =====================================
    # CLOSE CONNECTION
    # =====================================
    async def close(self):

        if self.ws:

            await self.ws.close()