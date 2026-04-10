from fastapi import APIRouter
from pydantic import BaseModel
from uuid import uuid4

from src.infrastructure.db.models.lead import Lead
from src.infrastructure.db.session import AsyncSessionLocal

router = APIRouter(prefix="/leads", tags=["Leads"])


class CreateLeadRequest(BaseModel):
    name: str
    company: str | None = None
    phone: str
    email: str
    requirement: str


@router.post("")
async def create_lead(payload: CreateLeadRequest):
    async with AsyncSessionLocal() as session:
        lead = Lead(
            id=str(uuid4()),
            name=payload.name,
            company=payload.company,
            phone=payload.phone,
            email=payload.email,
            requirement=payload.requirement
        )

        session.add(lead)
        await session.commit()

        return {
            "success": True,
            "lead_id": lead.id
        }