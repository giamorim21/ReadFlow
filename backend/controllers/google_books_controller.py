from fastapi import APIRouter, Query
from typing import List
from database.book_schema import LivroSchema
from services.google_books import search_books

router = APIRouter(prefix="/google-books", tags=["Google Books"])

@router.get("/search", response_model=List[LivroSchema])
async def search_books_route(query: str = Query(..., min_length=1), max_results: int = 10):
    items = await search_books(query, max_results)
    livros = []

    for item in items:
        info = item.get("volumeInfo", {})

        titulo = info.get("title")
        autores = info.get("authors", [])
        imagem = info.get("imageLinks", {}).get("thumbnail")

        # ✅ FILTRAGEM: ignorar livros incompletos
        if not (titulo and autores and imagem):
            continue

        autor = ", ".join(autores)
        categorias = info.get("categories", [])
        genero = ", ".join(categorias) if categorias else None

        data_publicacao = info.get("publishedDate", "")
        ano_lancamento = int(data_publicacao[:4]) if data_publicacao[:4].isdigit() else None

        livro = LivroSchema(
            titulo=titulo,
            autor=autor,
            genero=genero,
            sinopse=info.get("description"),
            ano_lancamento=ano_lancamento,
            quantidade_paginas=info.get("pageCount"),
            editora=info.get("publisher"),
            imagem=imagem
        )
        livros.append(livro)

    return livros
