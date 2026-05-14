from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, func
from datetime import datetime

from src.infrastructure.db.models.conversation import Conversation
from src.infrastructure.db.models.message import Message


class ConversationRepository:

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, language: str):
        convo = Conversation(language=language)
        self.db.add(convo)
        await self.db.flush()  # get ID

        return convo.id

    async def add_message(self, conversation_id, role, content):
        msg = Message(
            conversation_id=conversation_id,
            role=role,
            content=content
        )
        self.db.add(msg)

    async def finalize(self, conversation_id):
        ended_at = datetime.utcnow()

        # aggregate counts
        result = await self.db.execute(
            select(
                func.count(Message.id),
                func.sum(func.case((Message.role == "user", 1), else_=0)),
                func.sum(func.case((Message.role == "assistant", 1), else_=0))
            ).where(Message.conversation_id == conversation_id)
        )

        total, user_count, assistant_count = result.one()

        await self.db.execute(
            update(Conversation)
            .where(Conversation.id == conversation_id)
            .values(
                ended_at=ended_at,
                total_turns=total or 0,
                user_messages=user_count or 0,
                assistant_messages=assistant_count or 0,
                duration_seconds=func.extract(
                    "epoch", ended_at - Conversation.started_at
                )
            )
        )