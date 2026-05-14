class ProcessVoiceUseCase:

    def __init__(self, session_store):
        self.session_store = session_store

    async def execute(self, dto, audio_bytes, voice_service):

        user_text = ""

        if audio_bytes:
            user_text = await voice_service.speech_to_text(audio_bytes)

        if not user_text:
            user_text = dto["prompt"]

        # 2. LLM
        ai_text = await voice_service.generate_response(user_text)

        # 3. TTS PIPELINE
        tts_result = await voice_service.text_to_speech(
            text=ai_text,
            language=dto["language"],
            voice=dto["voice"]
        )

        return {
        "text": ai_text,
        "user_text": user_text,
        "audio_url": tts_result["audio_url"],
        "audio_id": tts_result["audio_id"]
    }