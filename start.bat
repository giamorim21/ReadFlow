@echo off

REM Ativar o ambiente virtual e iniciar o backend
cd backend
call venv\Scripts\activate
start cmd /k "uvicorn app.main:app --reload"

cd ..
cd frontend
start cmd /k "npm start"
