from fastapi import FastAPI
from app.database import engine,Base
from app.models.user import User
from app.models.job import Job
from app.models.application import Application
from app.models.company import Company
from app.models.profile import Profile
from app.routes.company import router as company_router
from app.routes.profile import router as profile_router
from app.routes import auth
from app.routes import user
from app.routes.job import router as job_router
Base.metadata.create_all(bind=engine)
app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://job-portal-project-1-f7hq.onrender.com",
        ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(company_router)
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(job_router)
app.include_router(profile_router)

@app.get("/")
def home():
    return {"message": "Growth Dashboard Backend is Running!"}
