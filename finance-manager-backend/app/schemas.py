from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

# Request schema (for user registration)
class UserBase(BaseModel):
    email: EmailStr

class UserResponse(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(...,min_length=8)  # Plain password, will be hashed later


class UserUpdate(BaseModel):
    email: EmailStr | None = None
    password: str | None = Field(None, min_length=8)
