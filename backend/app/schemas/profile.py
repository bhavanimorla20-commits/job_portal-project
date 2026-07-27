from pydantic import BaseModel

class ProfileCreate(BaseModel):
    skills: str
    experience: str
    resume: str


class ProfileResponse(ProfileCreate):
    id: int
    user_id: int

    class Config:
        from_attributes = True