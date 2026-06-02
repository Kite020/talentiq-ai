from datetime import datetime
from datetime import timedelta

from jose import jwt

SECRET_KEY = "talentiq-secret-key"

ALGORITHM = "HS256"


def create_access_token(data):

    payload = data.copy()

    expire = datetime.utcnow() + timedelta(
        hours=1
    )

    payload.update(
        {"exp": expire}
    )

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token