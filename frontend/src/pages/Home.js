import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';
import { FaSearch } from 'react-icons/fa';

const LivroCard = ({ livro, onClick }) => (
  <div className="livro-card" onClick={onClick}>
    <img
      src={livro.imagem}
      alt={livro.titulo}
    />
    <h4>{livro.titulo}</h4>
    <p>{livro.autor}</p>
  </div>
);

const Carrossel = ({ livros, titulo, idBase, loading, notFoundMessage, onLivroClick }) => {
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const updateArrowsVisibility = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, clientWidth, scrollWidth } = container;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const timeoutId = setTimeout(updateArrowsVisibility, 100);
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', updateArrowsVisibility);
    window.addEventListener('resize', updateArrowsVisibility);

    return () => {
      clearTimeout(timeoutId);
      container.removeEventListener('scroll', updateArrowsVisibility);
      window.removeEventListener('resize', updateArrowsVisibility);
    };
  }, [livros, loading]);

  const scrollContainer = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="carrossel-section">
      <h2 className="titulo-estilizado">{titulo}</h2>
      <div className="carrossel-container" style={{ position: 'relative' }}>
        {!loading && showLeftArrow && (
          <button className="seta esquerda" onClick={() => scrollContainer('left')} aria-label="Scroll para esquerda">◀</button>
        )}
        <div className="livros-wrapper" id={idBase} ref={containerRef}>
          {loading ? (
            <p className="loading-text">Carregando livros...</p>
          ) : livros.length > 0 ? (
            livros.map((livro, index) => (
              <LivroCard
                key={index}
                livro={livro}
                onClick={() => onLivroClick(livro)}
              />
            ))
          ) : notFoundMessage ? (
            <p className="not-found-text">{notFoundMessage}</p>
          ) : null}
        </div>
        {!loading && showRightArrow && (
          <button className="seta direita" onClick={() => scrollContainer('right')} aria-label="Scroll para direita">▶</button>
        )}
      </div>
    </section>
  );
};

const Home = () => {
  const [livrosRecomendados, setLivrosRecomendados] = useState([]);
  const [livrosPopulares, setLivrosPopulares] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  async function fetchLivros() {
    try {
      setLoading(true);
      const [resRecomendados, resPopulares] = await Promise.all([
        fetch('http://localhost:8000/google-books/search?query=best+seller'),
        fetch('http://localhost:8000/google-books/search?query=romance+best+seller'),
      ]);

      const [dataRecomendados, dataPopulares] = await Promise.all([
        resRecomendados.json(),
        resPopulares.json(),
      ]);

      setLivrosRecomendados(dataRecomendados);
      setLivrosPopulares(dataPopulares);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setIsSearching(true);
    try {
      const res = await fetch(`http://localhost:8000/google-books/search?query=${encodeURIComponent(searchTerm)}&langRestrict=pt`);
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    } finally {
      setLoading(false);
    }
  };

  const goToBookDetail = (livro) => {
    navigate(`/livro?name=${encodeURIComponent(livro.titulo)}`);
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  return (
    <main className="home-container">
      <div className="home-intro-container">
        <p className="home-intro-text">
          Bem-vindo ao <strong>ReadFlow</strong>! Encontre livros incríveis para ler, avaliar e acompanhar. 📚
        </p>
      </div>

      <form className="search-form" onSubmit={handleSearch} style={{ width: '100%', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Buscar livros por título, autor ou gênero..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!e.target.value.trim()) {
              setIsSearching(false);
              setSearchResults([]);
            }
          }}
          className="search-home-input"
          style={{ flexGrow: 1, padding: '10px 16px', fontSize: '1rem' }}
        />
        <button type="submit" className="search-home-button">
          <FaSearch />
        </button>
      </form>

      {isSearching ? (
        <Carrossel
          livros={searchResults}
          titulo={`🔍 Resultados para "${searchTerm}"`}
          idBase="pesquisa"
          loading={loading}
          notFoundMessage={`Esse livro não foi encontrado, mas aqui estão algumas opções parecidas! 📖`}
          onLivroClick={goToBookDetail}
        />
      ) : (
        <>
          <Carrossel
            livros={livrosRecomendados}
            titulo="✨ Recomendados para você"
            idBase="recomendados"
            loading={loading}
            onLivroClick={goToBookDetail}
          />
          <Carrossel
            livros={livrosPopulares}
            titulo="🔥 Livros Populares"
            idBase="populares"
            loading={loading}
            onLivroClick={goToBookDetail}
          />
        </>
      )}
    </main>
  );
};

export default Home;