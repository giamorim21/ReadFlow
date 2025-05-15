import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import '../css/DetalheLivro.css';
import placeholderImage from '../assets/livro.jpeg';

const DetalheLivro = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Recebe o livro via state ou fallback para exemplo estático
  const livro = location.state || {
    id,
    titulo: 'Título do Livro Exemplo',
    autor: 'Nome do Autor',
    descricao:
      'Este é um exemplo de descrição detalhada do livro. Aqui você pode colocar sinopses, destaques, trechos ou qualquer outra informação relevante para o usuário.',
    imagem: placeholderImage,
    editora: 'Editora Exemplo',
    ano: 2023,
    paginas: 350,
    idioma: 'Português',
    categoria: 'Ficção Científica',
  };

  return (
    <div className="detalhe-container">
      <button className="botao-voltar" onClick={() => navigate(-1)}>⟵ Voltar</button>

      <div className="livro-detalhes">
        <img src={livro.imagem} alt={livro.titulo} className="imagem-livro" />

        <div className="info-livro">
          <h1>{livro.titulo}</h1>
          <h3>{livro.autor}</h3>

          <p className="descricao">{livro.descricao}</p>

          <ul className="info-extra">
            <li><strong>Editora:</strong> {livro.editora}</li>
            <li><strong>Ano:</strong> {livro.ano}</li>
            <li><strong>Páginas:</strong> {livro.paginas}</li>
            <li><strong>Idioma:</strong> {livro.idioma}</li>
            <li><strong>Categoria:</strong> {livro.categoria}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetalheLivro;
