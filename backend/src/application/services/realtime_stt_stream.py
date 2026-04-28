import asyncio
import base64

from src.infrastructure.audio.wav_utils import pcm_to_wav_bytes


class RealtimeSTTStream:
    def __init__(self, stt_provider):
        self.stt_provider = stt_provider

    async def run(
        self,
        websocket,
        language_code: str = "en-IN",
    ):
        """
        language_code comes from frontend selection
        via RealtimeOrchestrator.current_language
        Example:
            te-IN
            hi-IN
            kn-IN
            en-IN
        """

        print(
            "[RealtimeSTTStream Language]:",
            language_code,
        )

        async with self.stt_provider.get_connection(
            language_code=language_code,
        ) as ws:

            async def sender():
                buffer = bytearray()

                try:
                    while True:
                        try:
                            chunk = await websocket.receive_bytes()
                        except Exception:
                            # client disconnected
                            break

                        # invalid PCM chunk safety check
                        if len(chunk) % 2 != 0:
                            continue

                        buffer.extend(chunk)

                        # wait until minimum audio size collected
                        if len(buffer) < 16000:
                            continue

                        # convert PCM → WAV for Sarvam
                        wav_bytes = pcm_to_wav_bytes(bytes(buffer))
                        audio_b64 = base64.b64encode(
                            wav_bytes
                        ).decode("utf-8")

                        try:
                            await ws.transcribe(
                                audio=audio_b64,
                                encoding="audio/wav",
                                sample_rate=16000,
                            )
                        except Exception:
                            # STT websocket already closed
                            break

                        buffer.clear()

                except asyncio.CancelledError:
                    print("[STT SENDER CANCELLED]")

            # background sender task
            sender_task = asyncio.create_task(sender())

            try:
                async for response in ws:
                    print("RAW:", response)

                    if response.type == "events":
                        signal = response.data.signal_type

                        if signal == "START_SPEECH":
                            print("🎤 speech started")

                        elif signal == "END_SPEECH":
                            print("🛑 speech ended")

                    elif response.type == "data":
                        text = response.data.transcript

                        if text:
                            print("[STT]", text)

                            yield {
                                "text": text,
                                "language": (
                                    response.data.language_code
                                    or language_code
                                ),
                            }

            except Exception as e:
                print("[STT RECEIVER ERROR]:", e)

            finally:
                # critical cleanup
                sender_task.cancel()

                try:
                    await sender_task
                except Exception:
                    pass

                print("[STT CLEAN EXIT]")
