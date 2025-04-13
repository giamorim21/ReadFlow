CREATE TABLE Usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    senha VARCHAR(255)
);

CREATE TABLE Livro (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255),
    autor VARCHAR(255),
    genero VARCHAR(100),
    avaliacaoMedia FLOAT
);

CREATE TABLE Recomendacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

CREATE TABLE RecomendacaoDetalhada (
    id INT PRIMARY KEY AUTO_INCREMENT,
    recomendacao_id INT,
    livro_id INT,
    motivo TEXT,
    FOREIGN KEY (recomendacao_id) REFERENCES Recomendacao(id),
    FOREIGN KEY (livro_id) REFERENCES Livro(id)
);

CREATE TABLE LogRecomendacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    dataHora TIMESTAMP,
    livros_recomendados TEXT, -- JSON ou CSV
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

CREATE TABLE Avaliacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    livro_id INT,
    nota INT CHECK (nota BETWEEN 0 AND 10),
    comentario TEXT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (livro_id) REFERENCES Livro(id)
);

CREATE TABLE BibliotecaPessoal (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    livro_id INT,
    status VARCHAR(20), -- "lido", "lendo", "para ler"
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (livro_id) REFERENCES Livro(id)
);

CREATE TABLE Administrador (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    email VARCHAR(255) UNIQUE
);

CREATE TABLE APIExterna (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255)
);

CREATE TABLE API_Livro (
    api_id INT,
    livro_id INT,
    PRIMARY KEY (api_id, livro_id),
    FOREIGN KEY (api_id) REFERENCES APIExterna(id),
    FOREIGN KEY (livro_id) REFERENCES Livro(id)
);

CREATE TABLE Administrador_APIExterna (
    administrador_id INT,
    api_id INT,
    PRIMARY KEY (administrador_id, api_id),
    FOREIGN KEY (administrador_id) REFERENCES Administrador(id),
    FOREIGN KEY (api_id) REFERENCES APIExterna(id)
);

CREATE TABLE Administrador_Usuario (
    administrador_id INT,
    usuario_id INT,
    PRIMARY KEY (administrador_id, usuario_id),
    FOREIGN KEY (administrador_id) REFERENCES Administrador(id),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

CREATE TABLE Administrador_Recomendacao (
    administrador_id INT,
    recomendacao_id INT,
    PRIMARY KEY (administrador_id, recomendacao_id),
    FOREIGN KEY (administrador_id) REFERENCES Administrador(id),
    FOREIGN KEY (recomendacao_id) REFERENCES Recomendacao(id)
);
