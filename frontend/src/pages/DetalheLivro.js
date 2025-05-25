import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Removed useParams
import { FaBookmark } from 'react-icons/fa';
import Estrelas from '../components/Estrelas';
import MarcadorStatus from '../components/MarcadorStatus';
import ReviewItem from '../components/ReviewItem';
import '../css/DetalheLivro.css';

const DetalheLivro = () => {
  const location = useLocation(); // Obtenha o objeto location
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const bookName = searchParams.get('name'); // Obtenha o nome do livro do query parameter

  const [livro, setLivro] = useState(null);
  const [status, setStatus] = useState('');
  const [avaliacao, setAvaliacao] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLivroDetalhe = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8000/google-books/detail/name?name=${encodeURIComponent(bookName)}`);
        if (!response.ok) {
          const errorData = await response.json();
          setError(`Erro ao buscar detalhes do livro: ${response.status} - ${errorData.detail}`);
          return;
        }
        const data = await response.json();
        setLivro(data);
      } catch (error) {
        setError('Erro inesperado ao buscar detalhes do livro.');
        console.error('Erro na requisição:', error);
      } finally {
        setLoading(false);
      }
    };

    if (bookName) {
      fetchLivroDetalhe();
    } else {
      setError("Nome do livro não fornecido.");
      setLoading(false);
    }
  }, [bookName]);

  const handleAvaliacao = (nota) => {
    setAvaliacao(nota);
  };

  const handleMarcador = (novoStatus) => {
    setStatus(prev => prev === novoStatus ? '' : novoStatus);
  };

  if (loading) return <p>Carregando detalhes do livro...</p>;
  if (error) return <p className="erro-carregamento">{error}</p>;
  if (!livro) return <p>Livro não encontrado.</p>;

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
            <span className="nota-media">{livro.media ? livro.media.toFixed(1) : 'N/A'}</span>
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

      {livro.reviews && (
        <div className="ultimas-reviews">
          <h3>Últimas Reviews</h3>
          {livro.reviews.map((review, i) => (
            <ReviewItem key={i} review={review} />
          ))}
        </div>
      )}

      {livro.recomendados && (
        <div className="recomendacoes">
          <h3>Leitores desse livro recomendam</h3>
          <div className="grid-recomendacoes">
            {livro.recomendados.map((rec) => (
              <div key={rec.id} className="livro-card">
                <img src={rec.imagem} alt={`Capa de ${rec.titulo}`} />
                <h4>{rec.titulo}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalheLivro;