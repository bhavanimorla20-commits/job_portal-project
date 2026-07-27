from fastapi import APIRouter
from app.database import SessionLocal
from app.models.profile import Profile
from app.schemas.profile import ProfileCreate

router = APIRouter()

# Create Profile
@router.post("/profile/{user_id}")
def create_profile(user_id: int, profile: ProfileCreate):
    db = SessionLocal()

    new_profile = Profile(
        user_id=user_id,
        skills=profile.skills,
        experience=profile.experience,
        resume=profile.resume
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    db.close()

    return {
        "message": "Profile created successfully",
        "profile": new_profile
    }


# Get Profile
@router.get("/profile/{user_id}")
def get_profile(user_id: int):
    db = SessionLocal()

    profile = db.query(Profile).filter(Profile.user_id == user_id).first()

    db.close()

    if not profile:
        return {"message": "Profile not found"}

    return profile


# Update Profile
@router.put("/profile/{user_id}")
def update_profile(user_id: int, profile: ProfileCreate):
    db = SessionLocal()

    db_profile = db.query(Profile).filter(Profile.user_id == user_id).first()

    if not db_profile:
        db.close()
        return {"message": "Profile not found"}

    db_profile.skills = profile.skills
    db_profile.experience = profile.experience
    db_profile.resume = profile.resume

    db.commit()
    db.refresh(db_profile)
    db.close()

    return {
        "message": "Profile updated successfully",
        "profile": db_profile
    }