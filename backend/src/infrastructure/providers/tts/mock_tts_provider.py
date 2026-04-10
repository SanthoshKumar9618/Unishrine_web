import asyncio


class MockTTSProvider:

    async def stream(self, text: str):
        for i in range(5):
            await asyncio.sleep(0.05)
            yield b"\x00" * 640  # fake audio chunk