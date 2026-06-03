from fastapi import Depends
from fastapi import HTTPException

from fastapi.security import HTTPBearer
from fastapi.security import HTTPAuthorizationCredentials

from jose import jwt

from sqlalchemy.orm import Session

from app.database import SessionLocal

from app.models.user_model import User


SECRET_KEY = "talentiq-secret-key"

ALGORITHM = "HS256"

security = HTTPBearer()


def get_current_user(

    credentials: HTTPAuthorizationCredentials
    = Depends(security)

):

    token = credentials.credentials

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("sub")

    except Exception:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:

        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return user