import time


class Timer:

    def __init__(self, name: str, session_id: str):
        self.name = name
        self.session_id = session_id

    def __enter__(self):
        self.start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        end = time.perf_counter()
        duration = (end - self.start) * 1000  # ms

        print(f"[{self.session_id}] {self.name} took {duration:.2f} ms")