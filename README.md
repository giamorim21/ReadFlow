# 📚 ReadFlow - Sistema de Recomendação de Livros com IA

Este é um projeto integrador desenvolvido no 5º semestre de Ciência da Computação. O sistema utiliza **React (frontend)**, **FastAPI (backend)** e **MySQL (banco de dados)** para recomendar livros com base em IA.

---

## 🖥️ Pré-requisitos

Antes de começar, você precisa ter instalado:

### 🔧 Softwares

| Ferramenta | Download |
|-----------|----------|
| [Node.js](https://nodejs.org/) | Versão LTS recomendada |
| [Python 3.11+](https://www.python.org/downloads/) | Inclua no PATH |
| [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) | Configure usuário e senha |
| [Visual Studio Code](https://code.visualstudio.com/) | Editor de código |

---

### 🧩 Extensões do VS Code

Instale as seguintes extensões no VS Code para uma melhor experiência:

| Nome | ID (para buscar no VS Code) | Por que instalar |
|------|-----------------------------|------------------|
| Python | `ms-python.python` | Suporte ao Python e execução do backend |
| Pylance | `ms-python.vscode-pylance` | IntelliSense e análise de código Python |
| ESLint | `dbaeumer.vscode-eslint` | Padronização de código JavaScript/React |
| Prettier - Code Formatter | `esbenp.prettier-vscode` | Formatação automática do código |
| React Snippets | `dsznajder.es7-react-js-snippets` | Atalhos para código React |

---

## ⚙️ Estrutura do Projeto

```
readflow/
├── backend/
│   ├── app/
│   │   └── main.py
│   ├── controllers/
│   │   └── ...
│   ├── database/
│   │   ├── database.py
│   │   ├── init_db.py
│   │   └── schema.sql
│   ├── models/
│   │   └── ...
│   ├── requirements.txt
│   └── venv/
├── frontend/
│   ├── src/
│   │   └── ...
│   ├── package.json
│   └── node_modules/
├── start.bat
└── README.md
```

---

## 🚀 Como rodar o projeto (passo a passo)

### 🐍 1. Configurar o backend (FastAPI)

Abra o terminal e execute:

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # (Windows)
pip install -r requirements.txt
```

### ⚛️ 2. Configurar o frontend (React)

Em outro terminal:

```bash
cd frontend
npm install axios
```

### 🔁 3. Iniciar tudo com um só comando

Volte para a pasta raiz e execute:

```bash
.\start.bat
```

Esse script vai:

- Ativar o ambiente virtual do backend
- Rodar o servidor FastAPI na porta 8000
- Rodar o frontend React na porta 3000

---

## 🛢️ Banco de Dados MySQL

### 1. Variáveis de ambiente

Crie um arquivo .env dentro da pasta backend/ com o seguinte conteúdo:

Você pode rodar o script com:

```bash
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=seu_usuario
MYSQL_PASSWORD=sua_senha
MYSQL_DATABASE=readflow
```

> ⚠️ Substitua os valores de acordo com sua configuração local.

### 2. Criar o banco de dados a partir do schema

Certifique-se de que o MySQL está rodando e execute:

```bash
cd backend
venv\Scripts\activate
python create_db.py
```
Esse comando:

Conecta ao banco usando as variáveis do .env

Cria o banco de dados readflow (caso não exista)

Executa o script schema.sql para criar as tabelas

### 3. Rodar o backend sem recriar o banco

```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

---

## 🧪 Teste rápido

Depois de rodar o projeto:

1. Acesse: `http://localhost:3000` → Interface do usuário
2. Acesse: `http://localhost:8000` → Backend FastAPI
3. Faça uma requisição de exemplo no React para garantir que tudo está conectado

---

## 📂 Arquivos ignorados no Git

Certifique-se de que os arquivos `.env`, `venv/`, `node_modules/`, e `build/` estão no `.gitignore`.

---

## 👥 Para os colegas que forem clonar o projeto

1. Clone o repositório:
   ```bash
   https://github.com/giamorim21/ReadFlow.git
   cd readflow
   ```

2. Siga os passos da seção **"Como rodar o projeto"** acima.
