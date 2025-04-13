# backend/app/main.py
from fastapi import FastAPI # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from database.database import get_connection

app = FastAPI()

# Permitir comunicação com o frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    conn = get_connection()
    if conn:
        print("✅ Conexão com o banco de dados estabelecida com sucesso!")
        conn.close()
    else:
        print("❌ Falha na conexão com o banco de dados.")

@app.get("/")
def root():
    return {"message": "ReadFlow rodando com FastAPI + MySQL"}



