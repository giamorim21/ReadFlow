from fastapi import APIRouter, Query, HTTPException
from typing import List, Optional
from database.book_schema import LivroSchema
from services.google_books import search_books, get_book_by_id
import random

router = APIRouter(prefix="/google-books", tags=["Google Books"])

@router.get("/search", response_model=List[LivroSchema])
async def search_books_route(query: str = Query(..., min_length=1), max_results_to_fetch: int = 20, max_results_to_return: int = 10):
    """
    Busca livros com base na query e retorna uma seleção aleatória.

    Args:
        query: Termo de busca.
        max_results_to_fetch: Número máximo de resultados para buscar da API do Google Books.
        max_results_to_return: Número de resultados para retornar na resposta.
    """
    items = await search_books(query, max_results=max_results_to_fetch)
    livros = []
    for item in items:
        info = item.get("volumeInfo", {})
        book_id = item.get("id")

        titulo = info.get("title")
        autores = info.get("authors", [])
        imagem = info.get("imageLinks", {}).get("thumbnail")
        sinopse = info.get("description")
        categorias = info.get("categories", [])
        genero = ", ".join(categorias) if categorias else None
        data_publicacao = info.get("publishedDate", "")
        ano_lancamento = int(data_publicacao[:4]) if data_publicacao[:4].isdigit() else None
        quantidade_paginas = info.get("pageCount")

        if not (book_id and titulo and autores and imagem and genero and sinopse and ano_lancamento and quantidade_paginas):
            continue

        autor = ", ".join(autores)

        livro = LivroSchema(
            id=book_id,
            titulo=titulo,
            autor=autor,
            genero=genero,
            sinopse=sinopse,
            ano_lancamento=ano_lancamento,
            quantidade_paginas=quantidade_paginas,
            editora=info.get("publisher"),
            imagem=imagem
        )
        livros.append(livro)

    if len(livros) > max_results_to_return:
        return random.sample(livros, max_results_to_return)
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
        sinopse = info.get("description")
        categorias = info.get("categories", [])
        genero = ", ".join(categorias) if categorias else None
        data_publicacao = info.get("publishedDate", "")
        ano_lancamento = int(data_publicacao[:4]) if data_publicacao[:4].isdigit() else None
        quantidade_paginas = info.get("pageCount")
        if not (book_id and titulo and autores and imagem and genero and sinopse and ano_lancamento and quantidade_paginas):
            raise HTTPException(status_code=404, detail="Livro não encontrado.")
        autor = ", ".join(autores)
        return LivroSchema(
            id=book_id,
            titulo=titulo,
            autor=autor,
            genero=genero,
            sinopse=sinopse,
            ano_lancamento=ano_lancamento,
            quantidade_paginas=quantidade_paginas,
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
    sinopse = info.get("description")
    categorias = info.get("categories", [])
    genero = ", ".join(categorias) if categorias else None
    data_publicacao = info.get("publishedDate", "")
    ano_lancamento = int(data_publicacao[:4]) if data_publicacao[:4].isdigit() else None
    quantidade_paginas = info.get("pageCount")
    if not (titulo and autores and imagem and genero and sinopse and ano_lancamento and quantidade_paginas):
        raise HTTPException(status_code=404, detail="Livro não encontrado ou incompleto.")
    autor = ", ".join(autores)
    return LivroSchema(
        titulo=titulo,
        autor=autor,
        genero=genero,
        sinopse=sinopse,
        ano_lancamento=ano_lancamento,
        quantidade_paginas=quantidade_paginas,
        editora=info.get("publisher"),
        imagem=imagem
    )