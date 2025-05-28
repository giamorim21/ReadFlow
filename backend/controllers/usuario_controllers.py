from fastapi import APIRouter, HTTPException, Request
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
        
@router.post("/login")
def login_usuario(usuario: UsuarioCreate):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro de conexão com o banco de dados")
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT id, nome, email, senha_hash FROM Usuario WHERE email = %s", (usuario.email,))
        user = cursor.fetchone()
        if not user:
            raise HTTPException(status_code=401, detail="Email ou senha inválidos")
        if not bcrypt.checkpw(usuario.senha.encode(), user["senha_hash"].encode()):
            raise HTTPException(status_code=401, detail="Email ou senha inválidos")
        return {"id": user["id"], "nome": user["nome"], "email": user["email"]}
    finally:
        cursor.close()
        conn.close()
        
@router.put("/usuario/{usuario_id}")
def atualizar_usuario(usuario_id: int, dados: dict):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro de conexão com o banco de dados")
    cursor = conn.cursor(dictionary=True)
    try:
        # Atualiza nome e email
        if "nome" in dados:
            cursor.execute("UPDATE Usuario SET nome = %s WHERE id = %s", (dados["nome"], usuario_id))
        if "email" in dados:
            # Verifica se o novo email já existe para outro usuário
            cursor.execute("SELECT id FROM Usuario WHERE email = %s AND id != %s", (dados["email"], usuario_id))
            if cursor.fetchone():
                raise HTTPException(status_code=400, detail="Email já cadastrado por outro usuário")
            cursor.execute("UPDATE Usuario SET email = %s WHERE id = %s", (dados["email"], usuario_id))
        conn.commit()
        return {"message": "Dados atualizados com sucesso"}
    finally:
        cursor.close()
        conn.close()

@router.put("/usuario/{usuario_id}/senha")
def atualizar_senha(usuario_id: int, dados: dict):
    nova_senha = dados.get("nova_senha")
    if not nova_senha:
        raise HTTPException(status_code=400, detail="Nova senha não informada")
    senha_hash = bcrypt.hashpw(nova_senha.encode(), bcrypt.gensalt()).decode()
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro de conexão com o banco de dados")
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("UPDATE Usuario SET senha_hash = %s WHERE id = %s", (senha_hash, usuario_id))
        conn.commit()
        return {"message": "Senha atualizada com sucesso"}
    finally:
        cursor.close()
        conn.close()

@router.delete("/usuario/{usuario_id}")
def excluir_usuario(usuario_id: int):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro de conexão com o banco de dados")
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("DELETE FROM Usuario WHERE id = %s", (usuario_id,))
        conn.commit()
        return {"message": "Usuário excluído com sucesso"}
    finally:
        cursor.close()
        conn.close()     

@router.get("/usuario/check-nome")
def check_nome(nome: str, id: int):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro de conexão com o banco de dados")
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT id FROM Usuario WHERE nome = %s AND id != %s", (nome, id))
        exists = cursor.fetchone() is not None
        return {"exists": exists}
    finally:
        cursor.close()
        conn.close()