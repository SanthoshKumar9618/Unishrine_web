class SessionService:
    def __init__(self, redis_client):
        self.redis = redis_client

    def _key(self, session_id: str):
        return f"voice:session:{session_id}"

    async def load(self, session_id: str):
        return await self.redis.get(self._key(session_id)) or {
            "history": [],
            "collected": {},
            "last_text": None,
            "completed": False
        }

    async def save(self, session_id: str, state: dict):
        await self.redis.set(self._key(session_id), state)

    async def clear(self, session_id: str):
        await self.redis.delete(self._key(session_id))