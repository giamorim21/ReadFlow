import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBookmark, FaSpinner } from 'react-icons/fa';
import Estrelas from '../components/Estrelas';
import MarcadorStatus from '../components/MarcadorStatus';
import ReviewItem from '../components/ReviewItem';
import '../css/DetalheLivro.css';

const DetalheLivro = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const bookName = searchParams.get('name');

  const [livro, setLivro] = useState(null);
  const [status, setStatus] = useState('');
  const [avaliacao, setAvaliacao] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [livrosRecomendadosPorGenero, setLivrosRecomendadosPorGenero] = useState([]);

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
        if (data && data.genero) {
          fetchLivrosRecomendadosPorGenero(data.genero);
        }
      } catch (error) {
        setError('Erro inesperado ao buscar detalhes do livro.');
        console.error('Erro na requisição:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLivrosRecomendadosPorGenero = async (genero) => {
      try {
        const response = await fetch(`http://localhost:8000/google-books/search?query=${encodeURIComponent(genero)}&max_results=15`);
        if (!response.ok) {
          console.error('Erro ao buscar livros recomendados por gênero.');
          return;
        }
        const data = await response.json();
        const recommendations = data.filter(item => item.id !== livro?.id);
        const shuffled = recommendations.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);
        setLivrosRecomendadosPorGenero(selected);
      } catch (error) {
        console.error('Erro ao buscar livros recomendados por gênero:', error);
      }
    };

    if (bookName) {
      fetchLivroDetalhe();
    } else {
      setError("Nome do livro não fornecido.");
      setLoading(false);
    }
  }, [bookName, livro?.id]);

  const handleAvaliacao = (nota) => {
    setAvaliacao(nota);
  };

  const handleMarcador = (novoStatus) => {
    setStatus(prev => prev === novoStatus ? '' : novoStatus);
  };

  const goToBookDetail = (livroRecomendado) => {
    navigate(`/livro?name=${encodeURIComponent(livroRecomendado.titulo)}`);
  };

  if (loading) return (
    <p className="carregando" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
      Carregando detalhes do livro...
      <FaSpinner className="icone-carregando" spin size={24} />
    </p>
  );
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

      <div className="ultimas-reviews">
        <h3>Últimas Reviews</h3>
        {livro.reviews && livro.reviews.map((review, i) => (
          <ReviewItem key={i} review={review} />
        ))}
      </div>

      {livrosRecomendadosPorGenero.length > 0 && (
        <div className="recomendacoes">
          <h3>Leitores desse livro também se interessaram por</h3>
          <div className="grid-recomendacoes">
            {livrosRecomendadosPorGenero.map((rec) => (
              <div key={rec.id} className="livro-card" onClick={() => goToBookDetail(rec)} style={{ cursor: 'pointer' }}>
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