import asyncio


class MockSTTProvider:

    async def stream(self, audio_queue):
        buffer = 0

        while True:
            chunk = await audio_queue.get()
            buffer += len(chunk)

            # simulate partial text every ~5KB audio
            if buffer >= 5000:
                yield "hello how"
                await asyncio.sleep(0.05)

                yield "hello how are"
                await asyncio.sleep(0.05)

                yield "hello how are you"
                buffer = 0