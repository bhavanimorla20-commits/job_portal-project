from fastapi import APIRouter
from app.models.job import Job
from app.schemas.user import UserCreate
from app.database import SessionLocal
from app.models.user import User

router = APIRouter()


@router.post("/register")
def register(user: UserCreate):
    db = SessionLocal()

    new_user = User(
        username=user.username,
        email=user.email,
        password=user.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }


@router.get("/jobs")
def get_jobs():
    db = SessionLocal()
    jobs = db.query(Job).all()
    return jobs