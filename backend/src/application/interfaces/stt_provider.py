from abc import ABC, abstractmethod


class StreamingSTTProvider(ABC):

    @abstractmethod
    async def connect(self):
        pass