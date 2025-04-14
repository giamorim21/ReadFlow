# 📚 **ReadFlow** - Sistema de Recomendação de Livros com IA

✨ Projeto integrador do **5º semestre** de Ciência da Computação.  
🚀 O sistema utiliza **React** (frontend), **FastAPI** (backend) e **MySQL** (banco de dados) para recomendar livros com o poder da inteligência artificial.

---

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados:

### 🔧 **Softwares Essenciais**

| Ferramenta                | Download/Info                       |
|--------------------------|-------------------------------------|
| 🟩 Node.js                | Versão **LTS** recomendada          |
| 🐍 Python 3.11+           | Marque a opção **Add to PATH**      |
| 🐬 MySQL Community Server | Configure **usuário e senha**       |
| 🖥️ Visual Studio Code     | Editor de código recomendado        |

### 🧩 **Extensões do VS Code**

| Nome                         | ID (para buscar no VS Code)         | Por que instalar?                             |
|------------------------------|--------------------------------------|------------------------------------------------|
| 🐍 Python                    | `ms-python.python`                   | Suporte ao Python e execução do backend       |
| 🔮 Pylance                   | `ms-python.vscode-pylance`           | IntelliSense e análise de código Python       |
| 🧹 ESLint                    | `dbaeumer.vscode-eslint`             | Padronização de código JavaScript/React       |
| 🎨 Prettier - Code Formatter| `esbenp.prettier-vscode`             | Formatação automática do código               |
| ⚛️ React Snippets           | `dsznajder.es7-react-js-snippets`    | Atalhos para código React                     |

---

## ⚙️ Estrutura do Projeto

```bash
readflow/
├── backend/
│   ├── app/
│   ├── controllers/
│   ├── database/
│   │   ├── __pycache__/
│   │   ├── database.py
│   │   ├── init_db.py
│   │   └── schema.sql
│   ├── models/
│   ├── services/
│   │   ├── autenticacao.py
│   │   ├── criptografia.py
│   │   └── recomedador...
│   ├── utils/
│   ├── venv/
│   ├── create_db.py
│   └── requirements.txt
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── Footer.js
│       │   └── Header.js
│       ├── pages/
│       │   └── Home.js
│       ├── routes/
│       │   └── AppRoutes.js
│       ├── App.css
│       ├── App.js
│       ├── index.css
│       ├── index.js
│       ├── reportWebVitals.js
│       ├── package-lock.json
│       └── package.json
├── .env
├── .gitignore
├── README.md
└── start.bat

```

---

## 🚀 Como rodar o projeto (passo a passo)

### 🐍 1. Configurar o backend (FastAPI)

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # (Windows)
pip install -r requirements.txt
```

---

### ⚛️ 2. Configurar o frontend (React)

```bash
cd frontend
npm install axios
```

---

### 🔁 3. Iniciar tudo com um só comando

```bash
.\start.bat
```

📌 Esse script irá:

- ✅ Ativar o ambiente virtual do backend  
- 🚀 Rodar o servidor **FastAPI** na porta **8000**  
- ⚛️ Rodar o **frontend React** na porta **3000**

---

## 🛢️ Banco de Dados MySQL

### 1️⃣ Variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `backend/` com o seguinte conteúdo:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=seu_usuario
MYSQL_PASSWORD=sua_senha
MYSQL_DATABASE=readflow
```

⚠️ **Substitua os valores de acordo com sua configuração local.**

---

### 2️⃣ Criar o banco de dados a partir do schema

Certifique-se de que o MySQL está rodando e execute:

```bash
cd backend
venv\Scripts\activate
python create_db.py
```

Esse comando:

- 🔌 Conecta ao banco com as variáveis do `.env`  
- 🗂️ Cria o banco `readflow` (se não existir)  
- 🏗️ Executa o `schema.sql` para criar as tabelas  

---

### 3️⃣ Rodar o backend sem recriar o banco

```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

---

## 🧪 Teste rápido

Após rodar o projeto, acesse:

- 🌐 **Frontend**: [http://localhost:3000](http://localhost:3000)  
- ⚙️ **Backend**: [http://localhost:8000](http://localhost:8000)

Faça uma requisição de exemplo via React para garantir que tudo está funcionando 🔗

---

## 📂 Arquivos ignorados no Git

Garanta que o arquivo `.gitignore` inclua:

```
.env
venv/
node_modules/
build/
```