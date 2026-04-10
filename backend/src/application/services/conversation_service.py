class ConversationService:

    def __init__(self, repo):
        self.repo = repo

    async def start(self, language):
        return await self.repo.create(language)

    async def add_user(self, conversation_id, text):
        await self.repo.add_message(conversation_id, "user", text)

    async def add_assistant(self, conversation_id, text):
        await self.repo.add_message(conversation_id, "assistant", text)

    async def end(self, conversation_id):
        await self.repo.finalize(conversation_id)