from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.application.use_cases.voice.process_voice import ProcessVoiceUseCase
from src.application.use_cases.voice.end_session import EndSessionUseCase

from src.infrastructure.cache.inmemory_session_store import InMemorySessionStore
from src.infrastructure.db.session import get_db
from src.interfaces.dependencies import get_voice_service

from src.application.dto.voice_dto import EndSessionDTO

router = APIRouter()

# Session store
session_store = InMemorySessionStore()

# Use cases
process_usecase = ProcessVoiceUseCase(session_store=session_store)
end_usecase = EndSessionUseCase(session_store=session_store)


# ==============================
# POST /voice/process
# ==============================
@router.post("/process")
async def process_voice(
    request_id: str = Form(...),
    session_id: str = Form(...),
    persona: str = Form(...),
    prompt: str = Form(...),
    language: str = Form(...),
    voice: str = Form(...),
    audio: UploadFile = File(None),
    db: AsyncSession = Depends(get_db),
    voice_service = Depends(get_voice_service)
):
    # Read audio (NO conversion here ❗)
    audio_bytes = await audio.read() if audio else None

    dto = {
        "session_id": session_id,
        "persona": persona,
        "prompt": prompt,
        "language": language,
        "voice": voice,
    }

    result = await process_usecase.execute(dto, audio_bytes, voice_service)

    return {
        "request_id": request_id,
        "data": result
    }


# ==============================
# POST /voice/end-session
# ==============================
@router.post("/end-session")
async def end_session(
    payload: EndSessionDTO,
    db: AsyncSession = Depends(get_db),
    voice_service = Depends(get_voice_service)
):
    try:
        result = await end_usecase.execute(payload, voice_service)

        return {
            "success": True,
            "data": result
        }

    except ValueError as e:
        return {
            "success": False,
            "error": str(e)
        }

    except Exception as e:
        import traceback
        traceback.print_exc()

        raise HTTPException(status_code=500, detail=str(e))