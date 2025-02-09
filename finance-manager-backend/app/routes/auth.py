from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app import schemas, models
from app.database import get_db
from app.core import security  # Import from core/security.py

router = APIRouter()

@router.post("/login", response_model=schemas.Token)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_credentials.username).first()
    if not user_credentials.username or not user_credentials.password:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Email and password are required"
        )
    if not user or not security.verify_password(user_credentials.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Create JWT token
    access_token = security.create_access_token(data={"sub": user.email})
    
    return {"access_token": access_token, "token_type": "Bearer"}
