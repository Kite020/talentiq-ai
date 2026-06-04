from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float

from app.database import Base


class MatchResult(Base):

    __tablename__ = "match_results"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )
    user_id = Column(Integer)

    resume_id = Column(Integer)

    job_id = Column(Integer)

    overall_score = Column(Float)