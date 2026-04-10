from pydantic import Field
from pydantic_settings import BaseSettings ,SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str

    PUBLIC_BASE_URL: str

    GROQ_API_KEY: str   # 🔥 ADD THIS


    # ✅ REDIS
    REDIS_HOST: str
    REDIS_PORT: int
    REDIS_DB: int
    REDIS_SESSION_TTL: int
    
    SARVAM_API_KEY: str 
    SUPABASE_URL: str
    SUPABASE_KEY: str
    SUPABASE_BUCKET: str = "audio"

    model_config = SettingsConfigDict(
    env_file=".env",
    extra="ignore"
)


settings = Settings()