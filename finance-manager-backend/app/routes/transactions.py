from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas, database
from typing import List

router = APIRouter()

# Dependency to get the database session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🟢 CREATE Transaction
@router.post("/", response_model=schemas.Transaction)
def create_transaction(transaction: schemas.TransactionCreate, db: Session = Depends(get_db), user_id: int = 1):
    return crud.create_transaction(db=db, transaction=transaction, user_id=user_id)

# 🔵 READ all transactions for a user
@router.get("/", response_model=List[schemas.Transaction])
def get_transactions(user_id: int, db: Session = Depends(get_db), skip: int = 0, limit: int = 10):
    return crud.get_transactions(db=db, user_id=user_id, skip=skip, limit=limit)

# 🟡 READ a single transaction
@router.get("/{transaction_id}", response_model=schemas.Transaction)
def get_transaction(transaction_id: int, db: Session = Depends(get_db)):
    transaction = crud.get_transaction(db=db, transaction_id=transaction_id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction

# 🟠 UPDATE Transaction
@router.put("/{transaction_id}", response_model=schemas.Transaction)
def update_transaction(transaction_id: int, transaction_update: schemas.TransactionUpdate, db: Session = Depends(get_db)):
    updated_transaction = crud.update_transaction(db=db, transaction_id=transaction_id, transaction_update=transaction_update)
    if not updated_transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return updated_transaction

# 🔴 DELETE Transaction
@router.delete("/{transaction_id}")
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    deleted_transaction = crud.delete_transaction(db=db, transaction_id=transaction_id)
    if not deleted_transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return {"message": "Transaction deleted successfully"}
