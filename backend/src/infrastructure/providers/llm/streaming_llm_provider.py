from abc import ABC, abstractmethod


class StreamingLLMProvider(ABC):

    @abstractmethod
    async def stream(self, text: str):
        """
        Must yield tokens
        """
        pass