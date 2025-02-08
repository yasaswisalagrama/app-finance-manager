from fastapi import APIRouter
from app.routes import auth, transactions, user  # Import individual route modules

router = APIRouter()

# Include all routers
router.include_router(auth.router, prefix="/auth", tags=["Auth"])
router.include_router(transactions.router, prefix="/transactions", tags=["Transactions"])
router.include_router(user.router, prefix="/user", tags=["User"])