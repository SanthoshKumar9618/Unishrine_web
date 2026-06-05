import json
from typing import Optional
from redis.asyncio import Redis

class RedisClient:
    def __init__(self, url: str):
        self.redis = Redis.from_url(
            url,
            decode_responses=True
        )

    async def set(self, key: str, value: dict, expire: int = 3600):
        await self.redis.set(
            key,
            json.dumps(value),
            ex=expire
        )

    async def get(self, key: str) -> Optional[dict]:
        data = await self.redis.get(key)
        return json.loads(data) if data else None

    async def delete(self, key: str):
        await self.redis.delete(key)