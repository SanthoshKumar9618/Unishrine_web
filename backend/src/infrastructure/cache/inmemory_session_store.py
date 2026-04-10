class InMemorySessionStore:
    def __init__(self):
        self.store = {}

    def _get_session(self, session_id: str):
        if session_id not in self.store:
            self.store[session_id] = {"history": []}
        return self.store[session_id]

    async def get(self, session_id: str):
        return self.store.get(session_id, {"history": []})

    async def append(self, session_id: str, role: str, text: str):
        session = self._get_session(session_id)

        session["history"].append({
            "role": role,
            "text": text
        })

        session["history"] = session["history"][-10:]

    async def delete(self, session_id: str):
        if session_id in self.store:
            del self.store[session_id]