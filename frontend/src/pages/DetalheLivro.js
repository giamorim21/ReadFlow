import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBookmark } from 'react-icons/fa';
import Estrelas from '../components/Estrelas';
import MarcadorStatus from '../components/MarcadorStatus';
import ReviewItem from '../components/ReviewItem';
import '../css/DetalheLivro.css';

const DetalheLivro = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [livro, setLivro] = useState(null);
  const [status, setStatus] = useState('');
  const [avaliacao, setAvaliacao] = useState(0);

  useEffect(() => {
    // Simulação de requisição
    const resposta = {
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
    setLivro(resposta);
  }, [id]);

  const handleAvaliacao = (nota) => {
    setAvaliacao(nota);
    // TODO: enviar avaliação para o backend
  };

  const handleMarcador = (novoStatus) => {
    setStatus(prev => prev === novoStatus ? '' : novoStatus);
    // TODO: salvar status no backend
  };

  if (!livro) return <p>Carregando...</p>;

  return (
    <div className="container-detalhe">
      <button className="botao-voltar" onClick={() => navigate(-1)}>← Voltar</button>

      <div className="conteudo">
        <div className="coluna-imagem">
          <img src={livro.imagem} alt={`Capa de ${livro.titulo}`} />
        </div>

        <div className="coluna-info">
          <h2 className="titulo">{livro.titulo}</h2>
          <p><strong>Autor:</strong> {livro.autor}</p>
          <p><strong>Gênero:</strong> {livro.genero}</p>
          <p><strong>Ano de Lançamento:</strong> {livro.ano_lancamento}</p>
          <p><strong>Páginas:</strong> {livro.quantidade_paginas}</p>
          <p><strong>Editora:</strong> {livro.editora}</p>
          <p><strong>Sinopse:</strong> {livro.sinopse}</p>

          <p><strong>Avaliação Média:</strong></p>
          <div className="avaliacao-media">
            <Estrelas nota={Math.floor(livro.media)} />
            <span className="nota-media">{livro.media.toFixed(1)}</span>
          </div>
        </div>

        <div className="coluna-interacoes">
          <h3>Adicione à Biblioteca</h3>

          <div className="marcadores">
            <h3>Status de Leitura</h3>
            <div className="grid-marcadores">
              {['Quero ler', 'Lendo', 'Lido', 'Abandonado'].map((item) => (
                <MarcadorStatus
                  key={item}
                  ativo={status === item}
                  onClick={() => handleMarcador(item)}
                >
                  <FaBookmark className="icone-bookmark" />
                  {item}
                </MarcadorStatus>
              ))}
            </div>
          </div>

          <div className="avaliacao-usuario">
            <h3>Sua Avaliação</h3>
            <div className="estrelas-clique">
              <Estrelas nota={avaliacao} clicavel onClick={handleAvaliacao} />
              {avaliacao > 0 && (
                <span className="nota-selecionada">{avaliacao} estrela{avaliacao > 1 ? 's' : ''}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="ultimas-reviews">
        <h3>Últimas Reviews</h3>
        {livro.reviews.map((review, i) => (
          <ReviewItem key={i} review={review} />
        ))}
      </div>
    </div>
  );
};

export default DetalheLivro;
