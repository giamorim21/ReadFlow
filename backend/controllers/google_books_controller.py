from fastapi import APIRouter, Query, HTTPException
from typing import List, Optional
from database.book_schema import LivroSchema
from services.google_books import search_books, get_book_by_id # Importe search_books

router = APIRouter(prefix="/google-books", tags=["Google Books"])

@router.get("/search", response_model=List[LivroSchema])
async def search_books_route(query: str = Query(..., min_length=1), max_results: int = 10):
    items = await search_books(query, max_results)
    livros = []
    for item in items:
        info = item.get("volumeInfo", {})
        book_id = item.get("id")
        titulo = info.get("title")
        autores = info.get("authors", [])
        imagem = info.get("imageLinks", {}).get("thumbnail")
        if not (book_id and titulo and autores and imagem):
            continue
        autor = ", ".join(autores)
        categorias = info.get("categories", [])
        genero = ", ".join(categorias) if categorias else None
        data_publicacao = info.get("publishedDate", "")
        ano_lancamento = int(data_publicacao[:4]) if data_publicacao[:4].isdigit() else None
        livro = LivroSchema(
            id=book_id,
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

@router.get("/detail/name", response_model=Optional[LivroSchema])
async def get_book_detail_by_name(name: str = Query(..., min_length=1)):
    items = await search_books(name, max_results=1) # Busca no Google Books pelo nome
    if items:
        item = items[0] # Pega o primeiro resultado (assumindo ser o mais relevante)
        info = item.get("volumeInfo", {})
        book_id = item.get("id")
        titulo = info.get("title")
        autores = info.get("authors", [])
        imagem = info.get("imageLinks", {}).get("thumbnail")
        if not (book_id and titulo and autores and imagem):
            raise HTTPException(status_code=404, detail="Livro não encontrado.")
        autor = ", ".join(autores)
        categorias = info.get("categories", [])
        genero = ", ".join(categorias) if categorias else None
        data_publicacao = info.get("publishedDate", "")
        ano_lancamento = int(data_publicacao[:4]) if data_publicacao[:4].isdigit() else None
        return LivroSchema(
            id=book_id,
            titulo=titulo,
            autor=autor,
            genero=genero,
            sinopse=info.get("description"),
            ano_lancamento=ano_lancamento,
            quantidade_paginas=info.get("pageCount"),
            editora=info.get("publisher"),
            imagem=imagem
        )
    raise HTTPException(status_code=404, detail="Livro não encontrado.")

@router.get("/detail/{book_id}", response_model=LivroSchema)
async def get_book_detail(book_id: str): # Manter a rota antiga por enquanto
    from services.google_books import get_book_by_id
    data = await get_book_by_id(book_id)
    info = data.get("volumeInfo", {})
    titulo = info.get("title")
    autores = info.get("authors", [])
    imagem = info.get("imageLinks", {}).get("thumbnail")
    if not (titulo and autores and imagem):
        raise HTTPException(status_code=404, detail="Livro não encontrado ou incompleto.")
    autor = ", ".join(autores)
    categorias = info.get("categories", [])
    genero = ", ".join(categorias) if categorias else None
    data_publicacao = info.get("publishedDate", "")
    ano_lancamento = int(data_publicacao[:4]) if data_publicacao[:4].isdigit() else None
    return LivroSchema(
        titulo=titulo,
        autor=autor,
        genero=genero,
        sinopse=info.get("description"),
        ano_lancamento=ano_lancamento,
        quantidade_paginas=info.get("pageCount"),
        editora=info.get("publisher"),
        imagem=imagem
    )