CREATE TABLE Usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Livro (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Recomendacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

CREATE TABLE RecomendacaoDetalhada (
    id INT PRIMARY KEY AUTO_INCREMENT,
    recomendacao_id INT NOT NULL,
    livro_id INT NOT NULL,
    motivo TEXT NOT NULL,
    FOREIGN KEY (recomendacao_id) REFERENCES Recomendacao(id),
    FOREIGN KEY (livro_id) REFERENCES Livro(id)
);

CREATE TABLE LogRecomendacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    dataHora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

CREATE TABLE LogRecomendacao_Livro (
    log_id INT NOT NULL,
    livro_id INT NOT NULL,
    PRIMARY KEY (log_id, livro_id),
    FOREIGN KEY (log_id) REFERENCES LogRecomendacao(id),
    FOREIGN KEY (livro_id) REFERENCES Livro(id)
);

CREATE TABLE Avaliacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    livro_id INT NOT NULL,
    nota INT NOT NULL CHECK (nota BETWEEN 0 AND 10),
    comentario TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (livro_id) REFERENCES Livro(id)
);

CREATE TABLE BibliotecaPessoal (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    livro_id INT NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('lido', 'lendo', 'para ler')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (livro_id) REFERENCES Livro(id)
);

CREATE TABLE APIExterna (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE API_Livro (
    api_id INT NOT NULL,
    livro_id INT NOT NULL,
    PRIMARY KEY (api_id, livro_id),
    FOREIGN KEY (api_id) REFERENCES APIExterna(id),
    FOREIGN KEY (livro_id) REFERENCES Livro(id)
);

CREATE TABLE Usuario_APIExterna (
    usuario_id INT NOT NULL,
    api_id INT NOT NULL,
    PRIMARY KEY (usuario_id, api_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (api_id) REFERENCES APIExterna(id)
);

CREATE TABLE Usuario_Recomendacao (
    usuario_id INT NOT NULL,
    recomendacao_id INT NOT NULL,
    PRIMARY KEY (usuario_id, recomendacao_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (recomendacao_id) REFERENCES Recomendacao(id)
);
