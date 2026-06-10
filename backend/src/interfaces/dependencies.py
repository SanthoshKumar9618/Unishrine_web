import uuid
from src.application.session.session_service import SessionService
from src.infrastructure.cache.redis_client import RedisClient
from src.config.settings import settings

from src.application.services.realtime_orchestrator import RealtimeOrchestrator

from src.infrastructure.realtime.openai_realtime_client import (
    OpenAIRealtimeClient
)



def get_realtime_orchestrator(websocket):

    redis_client = RedisClient(
    url=settings.REDIS_URL
)

    session_service = SessionService(
        redis_client
    )

    session_id = str(uuid.uuid4())

    # =========================
    # OPENAI REALTIME CLIENT
    # =========================

    realtime_client = OpenAIRealtimeClient(
        api_key=settings.OPENAI_API_KEY
    )

    return RealtimeOrchestrator(

        # keep old param name
        gemini_live=realtime_client,

        websocket=websocket,

        session_service=session_service,

        session_id=session_id

    )