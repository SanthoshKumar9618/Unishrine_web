from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime


# =========================
# BASE (GLOBAL)
# =========================
class BaseSlots(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    


# =========================
# CLINIC DOMAIN
# =========================
class ClinicSlots(BaseModel):
    patient_name: Optional[str] = None
    patient_age: Optional[int] = None
    gender: Optional[str] = None

    symptoms: Optional[str] = None
    department: Optional[str] = None

    appointment_date: Optional[str] = None
    appointment_time: Optional[str] = None

    doctor_preference: Optional[str] = None
    is_emergency: Optional[bool] = None


# =========================
# INSURANCE DOMAIN
# =========================
class InsuranceSlots(BaseModel):
    customer_name: Optional[str] = None
    age: Optional[int] = None

    insurance_type: Optional[str] = None
    coverage_amount: Optional[float] = None

    annual_income: Optional[float] = None
    existing_policy: Optional[bool] = None

    family_members: Optional[int] = None
    contact_time_preference: Optional[str] = None


# =========================
# ECOMMERCE DOMAIN
# =========================
class EcommerceSlots(BaseModel):
    customer_name: Optional[str] = None

    order_id: Optional[str] = None
    product_name: Optional[str] = None

    issue_type: Optional[str] = None
    issue_description: Optional[str] = None

    payment_method: Optional[str] = None
    address: Optional[str] = None


# =========================
# SESSION ROOT
# =========================
class SessionContext(BaseModel):
    session_id: str
    role: str

    base: BaseSlots = Field(default_factory=BaseSlots)

    clinic: Optional[ClinicSlots] = None
    insurance: Optional[InsuranceSlots] = None
    ecommerce: Optional[EcommerceSlots] = None

    last_updated: datetime = Field(default_factory=datetime.utcnow)