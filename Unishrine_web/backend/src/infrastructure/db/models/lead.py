from sqlalchemy import Column, String, Text
from sqlalchemy.dialects.postgresql import UUID
import uuid

from src.infrastructure.db.base import Base  # ✅ THIS WAS MISSING


class Lead(Base):
    __tablename__ = "leads"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    company = Column(String)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    requirement = Column(Text)