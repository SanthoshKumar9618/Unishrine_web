from sqlalchemy import Column
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid

from src.infrastructure.db.base import Base


class CallSession(Base):
    __tablename__ = "call_sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    # ✅ RELATIONSHIP
    transcripts = relationship(
        "TranscriptModel",
        back_populates="session",
        cascade="all, delete-orphan"
    )