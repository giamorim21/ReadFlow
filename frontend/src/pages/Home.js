import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';
import placeholderImage from '../assets/livro.jpeg';

const livrosRecomendados = Array(10).fill({
  id: 1,
  titulo: 'Livro Recomendado',
  descricao: 'Este é um livro muito interessante.',
  imagem: placeholderImage,
});

const livrosPopulares = Array(10).fill({
  id: 2,
  titulo: 'Livro Popular',
  descricao: 'Este é um dos livros mais populares.',
  imagem: placeholderImage,
});

const LivroCard = ({ livro, onClick }) => (
  <div className="livro-card" onClick={onClick}>
    <img src={livro.imagem} alt={livro.titulo} />
    <h4>{livro.titulo}</h4>
    <p>{livro.descricao}</p>
  </div>
);

const Carrossel = ({ livros, titulo, idBase }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Função para atualizar a visibilidade das setas
  const updateArrowsVisibility = () => {
    const container = containerRef.current;
    if (!container) return;
    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(container.scrollLeft + container.clientWidth < container.scrollWidth);
  };

  useEffect(() => {
    updateArrowsVisibility();
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', updateArrowsVisibility);
    window.addEventListener('resize', updateArrowsVisibility);
    return () => {
      container.removeEventListener('scroll', updateArrowsVisibility);
      window.removeEventListener('resize', updateArrowsVisibility);
    };
  }, []);

  const scrollContainer = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="carrossel-section">
      <h2 className="titulo-estilizado">{titulo}</h2>
      <div className="carrossel-container">
        {showLeftArrow && (
          <button className="seta esquerda" onClick={() => scrollContainer('left')} aria-label="Scroll para esquerda">
            ◀
          </button>
        )}

        <div className="livros-wrapper" id={idBase} ref={containerRef}>
          {livros.map((livro, index) => (
            <LivroCard
              key={index}
              livro={livro}
              onClick={() => navigate(`/livro/${livro.id}`, { state: livro })}
            />
          ))}
        </div>

        {showRightArrow && (
          <button className="seta direita" onClick={() => scrollContainer('right')} aria-label="Scroll para direita">
            ▶
          </button>
        )}
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <main className="home-container">
      <Carrossel livros={livrosRecomendados} titulo="✨ Recomendados para você" idBase="recomendados" />
      <Carrossel livros={livrosPopulares} titulo="🔥 Livros Populares" idBase="populares" />
    </main>
  );
};

export default Home;
