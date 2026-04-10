import asyncio
from typing import AsyncGenerator

from src.application.interfaces.tts_provider import TTSProvider


class MockTTSProvider(TTSProvider):

    async def stream(self, text: str) -> AsyncGenerator[bytes, None]:

        words = text.split()

        for word in words:
            await asyncio.sleep(0.02)

            yield f"AUDIO({word})".encode()