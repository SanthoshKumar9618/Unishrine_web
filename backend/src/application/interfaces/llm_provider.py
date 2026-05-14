from abc import ABC, abstractmethod
from typing import List, Dict


class LLMProvider(ABC):

    @abstractmethod
    async def generate(self, prompt: str) -> str:
        pass

    # optional future (chat-based)
    async def chat(self, messages: List[Dict]) -> str:
        raise NotImplementedError