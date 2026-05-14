from sqlalchemy import Column, String, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid

from src.infrastructure.db.base import Base


class TranscriptModel(Base):
    __tablename__ = "transcripts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    # ✅ CRITICAL FIX
    session_id = Column(
        UUID(as_uuid=True),
        ForeignKey("call_sessions.id", ondelete="CASCADE"),
        nullable=False
    )

    role = Column(String, nullable=False)
    text = Column(Text, nullable=False)

    # optional reverse relation
    session = relationship("CallSession", back_populates="transcripts")