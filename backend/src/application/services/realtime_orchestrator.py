import asyncio

import base64
import json
from src.domain.config.assistant_prompts import ASSISTANT_PROMPTS
from src.domain.services.extractor import extract_entities
from starlette.websockets import WebSocketState


class RealtimeOrchestrator:
    def __init__(
    self,
    gemini_live,
    websocket,
    session_service,
    session_id,
):
        self.gemini_live = gemini_live
        self.ws = websocket

        self.running = True


        self.current_language = "en-IN"
        self.selected_voice = "female_1"
        self.assistant_type = "insurance_advisor"
        self.system_prompt = ""


        self.last_text = ""  
        
       
        # Human-like pause settings
        
        self.min_text_length = 3
        self.session_service = session_service
        self.session_id = session_id

        self.state = None 

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

            language_name_map = {
                "en-IN": "English",
                "hi-IN": "Hindi",
                "te-IN": "Telugu",
                "kn-IN": "Kannada",
            }

            self.selected_language_name = (
                language_name_map[
                    self.current_language
                ]
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
    # ENTRYPOINT
    # =====================================
    async def start(self):


        self.state = await self.session_service.load(
            self.session_id
        )

        await self.initialize_session()

        await self.gemini_live.connect(
            language=self.selected_language_name,
            system_prompt=self.system_prompt,
        )

        await self.gemini_live.start_conversation()

        send_task = asyncio.create_task(
            self._send_audio_loop()
        )

        receive_task = asyncio.create_task(
            self._receive_gemini_loop()
        )

        try:
            await asyncio.Future()

        finally:
            await self._shutdown(send_task, receive_task)

    async def _send_audio_loop(self):

        has_audio = False

        while True:

            try:

                audio_chunk = await self.ws.receive_bytes()

                has_audio = True

                await self.gemini_live.send_audio(
                    audio_chunk
                )

            except Exception as e:

                print(
                    "[SEND AUDIO ERROR]",
                    e
                )

                break


    async def _receive_gemini_loop(self):

        async for event in self.gemini_live.receive():

            try:

                event_type = event.get("type")
                
                if event_type == "error":

                    print("\n========== OPENAI ERROR ==========")
                    print(event)
                    print("=================================\n")

                if "transcription" in event_type:

                    print(
                        "\n========== TRANSCRIPTION EVENT =========="
                    )
                    print(event)
                    print(
                        "========================================\n"
                    )
                
                # print(
                #         f"[OPENAI EVENT] {event_type}"
                #     )

                # =====================================
                # AUDIO STREAM
                # =====================================

                if event_type == "response.output_audio.delta":

    #                 print(
    #     f"AUDIO DELTA RECEIVED: {len(event['delta'])}"
    # )

                    audio_b64 = event["delta"]

                    audio_bytes = base64.b64decode(
                        audio_b64
                    )

                    if self.ws.client_state != WebSocketState.CONNECTED:
                        break

                    await self.ws.send_bytes(
                        audio_bytes
                    )

                # =====================================
                # USER TRANSCRIPT
                # =====================================
                elif event_type.startswith(
                    "conversation.item.input_audio"
                ):
                    print(
                        "\n========== USER AUDIO EVENT =========="
                    )
                    print(event)
                    print(
                        "======================================"
                    )

                elif (
                    event_type ==
                    "conversation.item.input_audio_transcription.completed"
                ):

                    transcript = event.get(
                        "transcript",
                        ""
                    )

                    if transcript:

                        print(
                            "\n========== USER TRANSCRIPT =========="
                        )
                        print(repr(transcript))
                        print(
                            "=====================================\n"
                        )

                        print(
                            f"\n[USER]: {transcript}\n"
                        )

                        self.state["history"].append(
                            f"User: {transcript}"
                        )

                        await self.ws.send_json({

                            "type": "user",

                            "text": transcript,
                        })

                # =====================================
                # ASSISTANT RESPONSE
                # =====================================

                elif (
                    event_type ==
                    "response.output_audio_transcript.done"
                ):

                    transcript = event.get(
                        "transcript",
                        ""
                    )

                    if transcript:

                        print(
                            f"\n[ASSISTANT]: {transcript}\n"
                        )

                        self.state["history"].append(
                            f"Assistant: {transcript}"
                        )

                        if self.ws.client_state == WebSocketState.CONNECTED:
                            await self.ws.send_json({

                            "type": "assistant",

                            "text": transcript,
                        })

                # =====================================
                # SAVE SESSION
                # =====================================
                elif event_type == "conversation.item.done":

                    print(
                        "\n========== ITEM DONE =========="
                    )

                    print(
                        json.dumps(
                            event,
                            indent=2
                        )
                    )

                    print(
                        "===============================\n"
                    )

                elif event_type == "response.done":

                    await self.session_service.save(
                        self.session_id,
                        self.state,
                    )

                # =====================================
                # ERRORS
                # =====================================

                # elif event_type == "error":

                #     print(
                #         "\n[OPENAI ERROR]",
                #         event,
                #         "\n"
                #     )

            except Exception as e:

                print(
                    "\n[RECEIVE LOOP ERROR]",
                    repr(e),
                    "\n"
                )

                break
    
       
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

        await self.gemini_live.close()

