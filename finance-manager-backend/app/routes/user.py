from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import UserCreate, UserResponse
from app.models import User
from app.crud import create_user, get_user_by_id
from app.dependencies import get_current_user  # Import auth dependency

router = APIRouter()

@router.post("/", response_model=UserResponse)
def create_new_user(user: UserCreate,current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Create a new user"""
    db_user = create_user(db=db, user=user)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User already exists")
    return db_user

@router.get("/me", response_model=UserResponse)
def get_current_user_profile(
    current_user: User = Depends(get_current_user)
):
    """Fetch the authenticated user's profile"""
    return current_user

@router.get("/{user_id}", response_model=UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Fetch user by ID"""
    db_user = get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
