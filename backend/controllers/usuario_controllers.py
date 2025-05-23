from fastapi import APIRouter, HTTPException
from database.user_schema import UsuarioCreate
from database.database import get_connection
import bcrypt

router = APIRouter()

@router.post("/cadastro")
def cadastrar_usuario(usuario: UsuarioCreate):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro de conexão com o banco de dados")
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT id FROM Usuario WHERE email = %s", (usuario.email,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Email já cadastrado")
        senha_hash = bcrypt.hashpw(usuario.senha.encode(), bcrypt.gensalt()).decode()
        cursor.execute(
            "INSERT INTO Usuario (nome, email, senha_hash) VALUES (%s, %s, %s)",
            (usuario.nome, usuario.email, senha_hash)
        )
        conn.commit()
        return {"message": "Usuário cadastrado com sucesso"}
    finally:
        cursor.close()
        conn.close()