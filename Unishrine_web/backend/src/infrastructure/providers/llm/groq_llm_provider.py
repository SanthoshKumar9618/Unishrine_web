from groq import Groq
from src.config.settings import settings
import asyncio

class GroqProvider:

    def __init__(self):
        # 🔥 AUTH HERE
        self.client = Groq(api_key=settings.GROQ_API_KEY)

    async def stream(self, text: str):
        def blocking_call():
            return self.client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {"role": "system", "content": "Short voice responses"},
                    {"role": "user", "content": text},
                ],
                stream=True,
            )

        stream = await asyncio.to_thread(blocking_call)

        for chunk in stream:
            token = chunk.choices[0].delta.content
            if token:
                yield token