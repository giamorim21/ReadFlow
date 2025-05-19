import httpx

GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes"

async def search_books(query: str, max_results: int = 10):
    params = {
        "q": query,
        "maxResults": max_results,
        "printType": "books",
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(GOOGLE_BOOKS_API_URL, params=params)
        response.raise_for_status()  # lança erro se status != 200
        data = response.json()
        return data.get("items", [])  # retorna apenas a lista de livros