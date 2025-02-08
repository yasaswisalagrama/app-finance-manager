from sqlalchemy import Column, ForeignKey, Integer, Numeric, String, DateTime, func
from app.database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)  # Ensure uniqueness
    email = Column(String, unique=True, nullable=False)  # Ensure uniqueness
    full_name = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now()) 

    transactions = relationship("Transaction", back_populates="user", cascade="all, delete-orphan")

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)  # Supports decimals
    category = Column(String, nullable=False)  # e.g., "Food", "Salary"
    type = Column(String, nullable=False)  # "income" or "expense"
    created_at = Column(DateTime, server_default=func.now())

    user = relationship("User", back_populates="transactions")