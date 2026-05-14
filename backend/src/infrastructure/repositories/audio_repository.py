import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text


class AudioRepository:

    def __init__(self, db: AsyncSession):
        self.db = db

    async def save_audio(self, text_value: str, audio_url: str):
        audio_id = str(uuid.uuid4())

        query = text("""
            INSERT INTO voice_messages (id, text, audio_url)
            VALUES (:id, :text, :audio_url)
        """)

        await self.db.execute(query, {
            "id": audio_id,
            "text": text_value,
            "audio_url": audio_url
        })

        await self.db.commit()

        return audio_id