import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css'; 
import placeholderImage from '../assets/livro.jpeg';

const livrosUsuario = [
  { id: 101, titulo: 'O Pequeno Príncipe', imagem: placeholderImage, status: 'lido' },
  { id: 102, titulo: 'A Menina que Roubava Livros', imagem: placeholderImage, status: 'lendo' },
  { id: 103, titulo: 'Harry Potter e a Pedra Filosofal', imagem: placeholderImage, status: 'quero ler' },
  { id: 104, titulo: 'Dom Casmurro', imagem: placeholderImage, status: 'lido' },
  { id: 105, titulo: '1984', imagem: placeholderImage, status: 'lendo' },
  { id: 106, titulo: 'O Senhor dos Anéis', imagem: placeholderImage, status: 'quero ler' },
];

const LivroCard = ({ livro, onClick }) => (
  <div className="livro-card" onClick={onClick}>
    <img src={livro.imagem} alt={`Capa do livro ${livro.titulo}`} />
    <h4>{livro.titulo}</h4>
    <span className={`status-badge status-${livro.status.replace(' ', '-')}`}>
      {livro.status.charAt(0).toUpperCase() + livro.status.slice(1)}
    </span>
  </div>
);

const Galeria = ({ livros, titulo }) => {
  const navigate = useNavigate();

  return (
    <section className="galeria-section">
      <h2 className="titulo-estilizado">{titulo}</h2>
      <div className="livros-galeria">
        {livros.map((livro) => (
          <LivroCard
            key={livro.id}
            livro={livro}
            onClick={() => navigate(`/livro/${livro.id}`, { state: livro })}
          />
        ))}
      </div>
    </section>
  );
};

const Biblioteca = () => {
  return (
    <main className="home-container">
      <Galeria livros={livrosUsuario} titulo="📚 Minha Biblioteca" />
    </main>
  );
};

export default Biblioteca;
