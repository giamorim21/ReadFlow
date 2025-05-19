import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBookmark } from 'react-icons/fa';
import '../css/DetalheLivro.css';

const DetalheLivro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livro, setLivro] = useState(null);
  const [status, setStatus] = useState('');
  const [avaliacao, setAvaliacao] = useState(0);

  useEffect(() => {
    const respostaSimulada = {
      id,
      titulo: 'O Pequeno Príncipe',
      autor: 'Antoine de Saint-Exupéry',
      genero: 'Fábula',
      ano_lancamento: 1943,
      quantidade_paginas: 96,
      editora: 'Reynal & Hitchcock',
      sinopse: 'Um clássico da literatura que fala sobre amor, amizade e a essência da vida.',
      imagem: 'https://m.media-amazon.com/images/I/71sBtM3Yi5L.jpg',
      media: 4.3,
      reviews: [
        { usuario: 'Ana', nota: 5, comentario: 'Maravilhoso!' },
        { usuario: 'Lucas', nota: 4, comentario: 'Muito bom, mas esperava mais do final.' },
      ],
    };
    setLivro(respostaSimulada);
  }, [id]);

  if (!livro) return <p>Carregando...</p>;

  return (
    <div className="detalhe-container">
      <button className="botao-voltar" onClick={() => navigate(-1)}>← Voltar</button>

      <div className="livro-detalhes">
        {/* Coluna da imagem */}
        <div className="coluna-imagem">
          <img src={livro.imagem} alt={livro.titulo} className="imagem-livro" />
        </div>

        {/* Coluna dos detalhes */}
        <div className="coluna-detalhes">
          <h1>{livro.titulo}</h1>
          <h3>{livro.autor}</h3>
          <ul className="info-extra">
            <li><strong>Gênero:</strong> {livro.genero}</li>
            <li><strong>Ano:</strong> {livro.ano_lancamento}</li>
            <li><strong>Páginas:</strong> {livro.quantidade_paginas}</li>
            <li><strong>Editora:</strong> {livro.editora}</li>
          </ul>
          <p className="descricao">{livro.sinopse}</p>
          <div className="avaliacao-media">
            <div className="estrelas">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className={`estrela ${livro.media >= i ? 'cheia' : ''}`}>★</span>
              ))}
            </div>
            <span className="nota-media">{livro.media.toFixed(1)}</span>
          </div>
        </div>

        {/* Coluna das interações */}
        <div className="coluna-interacoes">
          <div className="cabecalho-interacoes">
            <span className="barra-lateral"></span>
            <h3 className="titulo-biblioteca">Adicionar à Biblioteca</h3>
          </div>

          <div className="marcadores">
            {['quero ler', 'lendo', 'lido', 'abandonado'].map((opcao) => (
              <button
                key={opcao}
                className={`marcador ${status === opcao ? 'ativo' : ''}`}
                onClick={() => setStatus(opcao)}
              >
                <FaBookmark className="icone-bookmark" />
                {opcao.charAt(0).toUpperCase() + opcao.slice(1)}
              </button>
            ))}
          </div>

          <div className="avaliacao-usuario">
            <p>Avalie este livro:</p>
            <div className="estrelas-clique">
              {[1, 2, 3, 4, 5].map((estrela) => (
                <span
                  key={estrela}
                  className={`estrela ${avaliacao >= estrela ? 'cheia' : ''}`}
                  onClick={() => setAvaliacao(estrela)}
                >
                  ★
                </span>
              ))}
              {avaliacao > 0 && (
                <span className="nota-selecionada">{avaliacao}/5</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="ultimas-reviews">
        <h3>Últimas avaliações</h3>
        {livro.reviews.map((review, i) => (
          <div className="review" key={i}>
            <div className="review-header">
              <strong>{review.usuario}</strong>
              <span className="estrelas">
                {[1, 2, 3, 4, 5].map((e) => (
                  <span key={e} className={`estrela ${review.nota >= e ? 'cheia' : ''}`}>★</span>
                ))}
              </span>
            </div>
            <p>{review.comentario}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetalheLivro;
