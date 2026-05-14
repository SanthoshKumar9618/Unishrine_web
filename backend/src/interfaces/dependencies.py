from src.config.settings import settings

# =========================
# STT (NEW STREAMING)
# =========================
from src.infrastructure.providers.stt.sarvam_streaming_stt_provider import (
    SarvamStreamingSTTProvider
)

# =========================
# LLM
# =========================
from src.infrastructure.providers.llm.groq_llm_provider import GroqProvider

# =========================
# TTS
# =========================
from src.infrastructure.providers.tts.sarvam_tts_provider import SarvamTTSProvider

# =========================
# EXISTING SERVICE (DO NOT BREAK)
# =========================
from src.application.services.voice_service import VoiceService

# =========================
# STREAMING SERVICES
# =========================
from src.application.services.realtime_stt_stream import RealtimeSTTStream
from src.application.services.realtime_orchestrator import RealtimeOrchestrator


# =========================================================
# PROVIDERS
# =========================================================

def get_stt_provider():
    return SarvamStreamingSTTProvider(
        api_key=settings.SARVAM_API_KEY
    )
       


def get_llm_provider():
    return GroqProvider()


_tts_provider = None

def get_tts_provider():
    global _tts_provider

    if _tts_provider is None:
        _tts_provider = SarvamTTSProvider()

    return _tts_provider


# =========================================================
# EXISTING (REST API SUPPORT)
# =========================================================

def get_voice_service():
    """
    ⚠️ Required by voice_router.py
    DO NOT REMOVE
    """
    return VoiceService(
        llm_provider=get_llm_provider(),
        tts_provider=get_tts_provider(),
        stt_provider=get_stt_provider(),  # optional depending on your impl
    )


# =========================================================
# STREAMING LAYER
# =========================================================

def get_realtime_stt_stream():
    return RealtimeSTTStream(
        stt_provider=get_stt_provider()
    )


def get_realtime_orchestrator(websocket):
    return RealtimeOrchestrator(
        stt_stream=get_realtime_stt_stream(),
        llm=get_llm_provider(),
        tts=get_tts_provider(),
        websocket=websocket,  # ✅ REQUIRED (your constructor needs it)
    )