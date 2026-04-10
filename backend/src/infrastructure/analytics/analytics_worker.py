import json
import asyncio
from redis.asyncio import Redis
from sqlalchemy.orm import Session
from src.infrastructure.db.base import Base
from src.infrastructure.db.Session import get_db_session
from src.infrastructure.db.models.analytics_models import (
    SessionMetrics,
    AgentMetrics,
    TenantMetrics,
)


class AnalyticsWorker:

    def __init__(self, redis: Redis):
        self._redis = redis
        self._stream_name = "zeva:events"

    async def run(self):
        last_id = "0-0"

        while True:
            results = await self._redis.xread(
                {self._stream_name: last_id},
                block=5000,
                count=10,
            )

            if not results:
                continue

            for stream, messages in results:
                for message_id, data in messages:
                    await self._process_event(data)
                    last_id = message_id

    async def _process_event(self, data):
        event_type = data[b"type"].decode()
        payload = json.loads(data[b"data"].decode())

        db: Session = get_db_session()

        if event_type == "session.completed":
            self._update_session_metrics(db, payload)

        if event_type == "tool.failed":
            self._increment_tool_failure(db, payload)

        db.commit()
        db.close()

    def _update_session_metrics(self, db, payload):
        session = SessionMetrics(
            session_id=payload["session_id"],
            tenant_id=payload["tenant_id"],
            agent_id=payload.get("agent_id"),
            total_tokens=payload.get("total_tokens", 0),
            total_cost=payload.get("total_cost", 0.0),
            total_latency_ms=payload.get("latency_ms", 0),
        )

        db.merge(session)

    def _increment_tool_failure(self, db, payload):
        agent = db.query(AgentMetrics).get(payload["agent_id"])
        if agent:
            agent.tool_failures += 1