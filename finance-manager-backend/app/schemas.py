from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from datetime import datetime
from enum import Enum
from sqlalchemy import Column, String

class Token(BaseModel):
    access_token: str
    token_type: str
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
    password: str = Field(..., min_length=6)  # Plain password, will be hashed later

# Schema for updating a user (all fields optional)
class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    password: Optional[str] = Field(None, min_length=8)  # Can update password


class UserLogin(BaseModel):
    email: EmailStr
    password: str

     
#Transactions Models
class TransactionType(str, Enum):
    INCOME = "income"
    EXPENSE = "expense"

# Enum for Transaction Categories
class TransactionCategory(str, Enum):
    FOOD = "Food"
    TRANSPORT = "Transport"
    BILLS = "Bills"
    ENTERTAINMENT = "Entertainment"
    SHOPPING = "Shopping"
    SALARY = "Salary"
    INVESTMENT = "Investment"
    OTHER = "Other"

# Base model (shared fields)
class TransactionBase(BaseModel):
    user_id: int  # Ensure transactions are linked to a user
    amount: float
    category: TransactionCategory
    type: TransactionType # Required field to indicate income/expense
    description: Optional[str] = None

    #model_config = ConfigDict(arbitrary_types_allowed=True)
# Create transaction (request body)
class TransactionCreate(BaseModel):
    amount: float
    category: TransactionCategory
    type: TransactionType
    description: Optional[str] = None

# Update transaction (request body)
class TransactionUpdate(TransactionBase):
    pass

# Response model (includes ID & timestamps)
class TransactionResponse(TransactionBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True