import asyncio


class MockLLMProvider:

    async def stream(self, text: str):
        response = "I am doing great today, how can I help you?"

        for word in response.split():
            await asyncio.sleep(0.05)  # simulate streaming
            yield word