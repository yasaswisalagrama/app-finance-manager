import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas, database
from typing import List

from app.dependencies import get_current_user
from app.models import User

router = APIRouter()

# Dependency to get the database session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🔴 CREATE a transaction
@router.post("/", response_model=schemas.TransactionResponse)
def create_transaction(
    transaction: schemas.TransactionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
  # ⛔ Fix: This should ideally come from authentication, not as a default
):
    #print("🔍 Current User:", current_user.__dict__)
    return crud.create_transaction(db=db, transaction=transaction, user_id=current_user.id)

# 🔵 READ all transactions for a user
@router.get("/", response_model=List[schemas.TransactionResponse])
def get_transactions( db: Session = Depends(get_db),current_user: User = Depends(get_current_user), skip: int = 0, limit: int = 100):
    transactions = crud.get_transactions(db=db, user_id=current_user.id, skip=skip, limit=limit)
    return transactions 

# 🟡 READ a single transaction
@router.get("/{transaction_id}", response_model=schemas.TransactionResponse)
def get_transaction(transaction_id: int,current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    transaction = crud.get_transaction(db=db, transaction_id=transaction_id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction  # ✅ Ensures correct response model

# 🟠 UPDATE Transaction
@router.put("/{transaction_id}", response_model=schemas.TransactionResponse)
def update_transaction(transaction_id: int, transaction_update: schemas.TransactionUpdate,current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    updated_transaction = crud.update_transaction(db=db, transaction_id=transaction_id, transaction_update=transaction_update)
    if not updated_transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return updated_transaction

# 🔴 DELETE Transaction
@router.delete("/{transaction_id}")
def delete_transaction(transaction_id: int,current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    deleted_transaction = crud.delete_transaction(db=db, transaction_id=transaction_id)
    if not deleted_transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return {"message": "Transaction deleted successfully"}
