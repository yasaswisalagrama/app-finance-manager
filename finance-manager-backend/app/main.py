from fastapi import Depends, FastAPI
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import text
from sqlalchemy.orm import Session
import uvicorn
from fastapi.openapi.utils import get_openapi
from app.router import router  # Centralized router
from app.database import get_db, engine, Base

# Initialize FastAPI app
app = FastAPI()

Base.metadata.drop_all(bind=engine)
# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# Include the centralized router
app.include_router(router)


@app.get("/")
def test_db(db: Session = Depends(get_db)):
    """Test database connection"""
    result = db.execute(text("SELECT version();"))
    version_info = result.fetchone()[0]
    return {"database_version": version_info}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
