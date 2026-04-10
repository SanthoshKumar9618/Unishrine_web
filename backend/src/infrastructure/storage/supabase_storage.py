import uuid

class SupabaseStorage:

    def __init__(self, client, bucket: str):
        self.client = client
        self.bucket = bucket

    async def upload_audio(self, audio_bytes: bytes, content_type: str = "audio/mpeg") -> str:
        file_name = f"{uuid.uuid4()}.mp3"

        # 1. Upload
        res = self.client.storage.from_(self.bucket).upload(
            file_name,
            audio_bytes,
            {
                "content-type": content_type
            }
        )

        if hasattr(res, "error") and res.error:
            raise RuntimeError(f"Upload failed: {res.error}")

        # 2. ✅ USE SIGNED URL (FIX)
        signed = self.client.storage.from_(self.bucket).create_signed_url(
            file_name,
            60  # expires in 60 seconds
        )

        audio_url = signed.get("signedURL")

        if not audio_url:
            raise RuntimeError("Failed to generate signed URL")

        print("✅ AUDIO URL:", audio_url)  # 🔥 DEBUG

        return audio_url