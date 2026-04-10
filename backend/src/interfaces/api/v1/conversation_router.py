from fastapi import APIRouter, Depends
from sqlalchemy import select
from src.infrastructure.db.session import get_db
from src.infrastructure.db.models.conversation import Conversation
from src.infrastructure.db.models.message import Message

router = APIRouter()


@router.get("/conversations")
async def list_conversations(db=Depends(get_db)):
    result = await db.execute(
        select(Conversation).order_by(Conversation.started_at.desc())
    )
    return result.scalars().all()


@router.get("/conversations/{id}")
async def get_messages(id: str, db=Depends(get_db)):
    result = await db.execute(
        select(Message).where(Message.conversation_id == id)
    )
    return result.scalars().all()