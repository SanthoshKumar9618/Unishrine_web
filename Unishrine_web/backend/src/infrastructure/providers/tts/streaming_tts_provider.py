from abc import ABC, abstractmethod


class StreamingTTSProvider(ABC):

    @abstractmethod
    async def stream(self, text: str):
        """
        Must yield audio chunks (bytes)
        """
        pass