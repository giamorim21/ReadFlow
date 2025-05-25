# backend/database/book_schema.py

from pydantic import BaseModel
from typing import Optional

class LivroSchema(BaseModel):
    id: str # Adicione o campo id
    titulo: str
    autor: Optional[str]
    genero: Optional[str]
    sinopse: Optional[str]
    ano_lancamento: Optional[int]
    quantidade_paginas: Optional[int]
    editora: Optional[str]
    imagem: Optional[str]