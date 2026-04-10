from abc import ABC, abstractmethod


class StreamingSTTProvider(ABC):

    @abstractmethod
    async def stream(self, audio_queue):
        """
        Must yield partial text continuously
        """
        pass