# backend/app/main.py
from fastapi import FastAPI # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from controllers import google_books_controller
from controllers import usuario_controllers
from database.database import get_connection
from controllers import google_books_controller

app = FastAPI()

app.include_router(google_books_controller.router)
app.include_router(usuario_controllers.router)

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



