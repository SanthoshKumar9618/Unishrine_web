from pydantic import BaseModel


class ProcessVoiceDTO(BaseModel):
    session_id: str
    persona: str
    prompt: str
    language: str
    voice: str


class EndSessionDTO(BaseModel):
    session_id: str
    lead_id: str
    