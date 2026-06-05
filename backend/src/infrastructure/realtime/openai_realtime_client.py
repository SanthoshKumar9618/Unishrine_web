import json
import base64
from pydoc import text
import websockets


class OpenAIRealtimeClient:

    def __init__(self, api_key: str):

        self.api_key = api_key
        self.ws = None
        self.debug_events = False
    # =====================================
    # CONNECT
    # =====================================
    async def connect(
    self,
    language: str,
    system_prompt: str,
    ):

        print(
            "\n========== LANGUAGE DEBUG =========="
        )

        print(
            "RAW LANGUAGE:",
            repr(language)
        )

        print(
            "====================================\n"
        )

        selected_language = language

        print(
            "\n========== LANGUAGE MAPPED =========="
        )

        print(
            "SELECTED:",
            selected_language
        )

        print(
            "=====================================\n"
        )

        try:

            print(
                "\n========== OPENAI CONNECT START ==========\n"
            )

            url = (
                "wss://api.openai.com/v1/realtime?model=gpt-realtime-1.5"
            )

            self.ws = await websockets.connect(

                url,

                additional_headers={

                    "Authorization":
                        f"Bearer {self.api_key}"
                },

                open_timeout=30,
            )

            print(
                "\n========== OPENAI CONNECTED ==========\n"
            )

        except Exception as e:

            print(
                "\n========== OPENAI CONNECT FAILED =========="
            )

            print(
                repr(e)
            )

            print(
                "===========================================\n"
            )

            raise

        print(
            "\nSESSION LANGUAGE SENT TO OPENAI:",
            selected_language,
            "\n"
        )

        payload = {
            "type": "session.update",
            "session": {
                "type": "realtime",

                

                "instructions": f"""
        {system_prompt}

        IMPORTANT:
        - Respond ONLY in {selected_language}
        - Keep answers short
        - According to prompt, ask for missing info one question at a time
        - Ask one question at a time
        """,

                "audio": {
                    "input": {
                        "turn_detection": {
                            "type": "server_vad",
                            "threshold": 0.75,
                            "prefix_padding_ms": 300,
                            "silence_duration_ms": 700,
                            "create_response": True,
                            "interrupt_response": True
                        }
                    }
                }
            }
        }

        print(
                "\n========== SESSION UPDATE PAYLOAD =========="
            )

        print(
                json.dumps(
                    payload,
                    indent=2
                )
            )

        print(
                "============================================\n"
            )

        await self.ws.send(
                json.dumps(payload)
            )
        
        
        
    async def start_conversation(self):

        payload = {
            "type": "response.create"
        }

        print(json.dumps(payload, indent=2))

        await self.ws.send(
            json.dumps(payload)
        )
        
    # =====================================
    # SEND AUDIO
    # =====================================
    async def send_audio(
        self,
        audio_bytes: bytes
    ):

        event = {

            "type":
                "input_audio_buffer.append",

            "audio":
                base64.b64encode(
                    audio_bytes
                ).decode()
        }
        
        

        await self.ws.send(
            json.dumps(event)
        )
        

    # =====================================
# SEND TEXT
# =====================================

    async def send_text(self, text: str):

        event = {
            "type": "conversation.item.create",
            "item": {
                "type": "message",
                "role": "assistant",
                "content": [
                    {
                        "type": "output_text",
                        "text": text
                    }
                ]
            }
        }

        await self.ws.send(
            json.dumps(event)
        ) 

    # =====================================
    # RECEIVE EVENTS
    # =====================================
    async def receive(self):

        IMPORTANT_EVENTS = {
            "error",
            "session.created",
            "session.updated",
            "response.done",
        }

        async for message in self.ws:

            parsed = json.loads(message)

            event_type = parsed.get("type")

            if event_type in IMPORTANT_EVENTS:

                print(
                    f"[OPENAI EVENT] {event_type}"
                )

            yield parsed

    # =====================================
    # CLOSE
    # =====================================
    async def close(self):

        if self.ws:

            await self.ws.close()