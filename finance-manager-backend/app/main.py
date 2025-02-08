from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session
import uvicorn

from app.database import get_db, engine, Base
from app.routes import auth, transactions  # Import routes

# Initialize FastAPI app
app = FastAPI()

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

@app.get("/")
def test_db(db: Session = Depends(get_db)):
    """Test database connection"""
    result = db.execute(text("SELECT version();"))
    version_info = result.fetchone()[0]
    return {"database_version": version_info}

# Include API routess
# app.include_router(auth.router, prefix="/auth", tags=["Auth"])
# app.include_router(transactions.router, prefix="/transactions", tags=["Transactions"])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
