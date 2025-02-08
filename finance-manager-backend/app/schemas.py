from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

# Base schema (common fields)
class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: str

# Schema for returning user details
class UserResponse(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True  # Enables ORM conversion

# Schema for creating a new user
class UserCreate(UserBase):
    password: str = Field(..., min_length=8)  # Plain password, will be hashed later

# Schema for updating a user (all fields optional)
class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    password: Optional[str] = Field(None, min_length=8)  # Can update password


class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Base model (shared fields)
class TransactionBase(BaseModel):
    amount: float
    category: str
    description: Optional[str] = None

# Create transaction (request body)
class TransactionCreate(TransactionBase):
    pass

# Update transaction (request body)
class TransactionUpdate(TransactionBase):
    pass

# Response model (including ID & timestamps)
class Transaction(TransactionBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True  # This allows conversion from SQLAlchemy objects