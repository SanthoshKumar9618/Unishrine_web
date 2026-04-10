from src.application.dto.voice_dto import EndSessionDTO

class EndSessionUseCase:

    def __init__(self, session_store):
        self.session_store = session_store

    async def execute(self, dto, voice_service):
        session_id = dto.session_id
        lead_id = dto.lead_id

        session = await self.session_store.get(session_id)

        if not session:
            raise ValueError("Session not found")

        transcript = session.get("messages", [])

        extracted = await voice_service.extract_structured_data(transcript)

        await voice_service.store_conversation(
            lead_id=lead_id,
            session_id=session_id,
            transcript=transcript,
            extracted=extracted
        )

        await self.session_store.delete(session_id)

        return {
            "session_id": session_id,
            "lead_id": lead_id,
            "message_count": len(transcript),
            "extracted": extracted
        }