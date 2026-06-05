import json
from typing import Optional
from redis.asyncio import Redis
from src.domain.entities.session import SessionContext


class SessionRepository:
    def __init__(self, redis: Redis, ttl: int = 3600):
        self.redis = redis
        self.ttl = ttl

    def _key(self, session_id: str) -> str:
        return f"session:{session_id}"

    async def get(self, session_id: str) -> Optional[SessionContext]:
        data = await self.redis.get(self._key(session_id))
        if not data:
            return None
        return SessionContext.model_validate_json(data)

    async def save(self, session: SessionContext):
        await self.redis.set(
            self._key(session.session_id),
            session.model_dump_json(),
            ex=self.ttl,
        )