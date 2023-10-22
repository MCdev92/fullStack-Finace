from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware

### note: Additionally, in this application will have cors enable to automatically defend the application
# against "cross origin request" because the react application is a completely different application 
# than the FastAPI application. Therefore, corse need to be enable. ###

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# pedantic model to validates the requests from the react application (rejects or accept based on validation).
class TransactionBase(BaseModel):
    amount: float
    category: str
    description: str
    is_income: bool
    date: str
    
class TransactionModel(TransactionBase):
    id: int
    
    class Config:
        orm_mode = True

# Database dependencies.
# get_db (dependencies injection), try create a db connection or close the db 
# make sure connection string opens when request comes in and close when request complete
def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)

# first enpoint for transactions application
# based on everything on transaction base, all variables are mapped from transaction base to table transaction into sqlite db
@app.post("/transactions/", response_model=TransactionModel)
async def create_transaction(transaction: TransactionBase, db: db_dependency):
    db_transaction = models.Transaction(**transaction.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

# Get API endpoint
# query parameter to allow us to fetch a certain amount of transactions
@app.get("/transactions/", response_model = List[TransactionModel])
async def read_transactions(db: db_dependency, skip: int = 0, limit: int = 100):
    transactions = db.query(models.Transaction).offset(skip).limit(limit).all()
    return transactions