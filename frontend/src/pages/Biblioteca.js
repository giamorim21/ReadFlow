import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../css/Biblioteca.css';
import placeholderImage from '../assets/livro.jpeg';

const STATUS_OPCOES = [
  { label: 'Todos', valor: 'todos' },
  { label: 'Quero Ler', valor: 'quero ler' },
  { label: 'Lendo', valor: 'lendo' },
  { label: 'Lido', valor: 'lido' },
  { label: 'Abandonado', valor: 'abandonado' },
];

// Componente para mostrar estrelas de avaliação
const EstrelasAvaliacao = ({ nota }) => {
  const estrelas = [];

  for (let i = 1; i <= 5; i++) {
    estrelas.push(
      <span
        key={i}
        className={`estrela ${i <= nota ? '' : 'inativa'}`}
      >
        ★
      </span>
    );
  }

  return <div className="estrelas-avaliacao">{estrelas}</div>;
};

const Biblioteca = () => {
  const navigate = useNavigate();

  const [livros, setLivros] = useState([
    { id: 101, titulo: 'O Pequeno Príncipe', imagem: placeholderImage, status: 'lido', nota: 5 },
    { id: 102, titulo: 'A Menina que Roubava Livros', imagem: placeholderImage, status: 'lendo', nota: 4 },
    { id: 103, titulo: 'Harry Potter e a Pedra Filosofal', imagem: placeholderImage, status: 'quero ler', nota: 0 },
    { id: 104, titulo: 'Dom Casmurro', imagem: placeholderImage, status: 'lido', nota: 3 },
    { id: 105, titulo: '1984', imagem: placeholderImage, status: 'abandonado', nota: 2 },
    { id: 106, titulo: 'O Senhor dos Anéis', imagem: placeholderImage, status: 'quero ler', nota: 0 },
    { id: 107, titulo: 'A Revolução dos Bichos', imagem: placeholderImage, status: 'lido', nota: 4 },
    { id: 108, titulo: 'O Hobbit', imagem: placeholderImage, status: 'lendo', nota: 5 },
    { id: 120, titulo: 'It: A Coisa', imagem: placeholderImage, status: 'abandonado', nota: 1 },
  ]);

  const [filtroStatus, setFiltroStatus] = useState('todos');

  const livrosFiltrados = filtroStatus === 'todos'
    ? livros
    : livros.filter(livro => livro.status === filtroStatus);

  const excluirLivro = (id) => {
    setLivros(livros.filter(livro => livro.id !== id));
  };

  return (
    <main className="biblioteca-container">
      <h2 className="titulo-principal">📚 Minha Biblioteca</h2>

      <div className="filtro-container">
        {STATUS_OPCOES.map(({ label, valor }) => (
          <button
            key={valor}
            className={`btn-filtro ${filtroStatus === valor ? 'ativo' : ''}`}
            onClick={() => setFiltroStatus(valor)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="livros-galeria">
        {livrosFiltrados.length === 0 && (
          <p className="msg-sem-livros">Nenhum livro encontrado para esse filtro.</p>
        )}
        {livrosFiltrados.map((livro) => (
          <div key={livro.id} className="livro-card">
            <img
              src={livro.imagem}
              alt={`Capa do livro ${livro.titulo}`}
              onClick={() => navigate(`/livro/${livro.id}`, { state: livro })}
            />
            <h4 className="livro-titulo">{livro.titulo}</h4>
            <span className={`status-badge status-${livro.status.replace(' ', '-')}`}>
              {livro.status}
            </span>

            <EstrelasAvaliacao nota={livro.nota} />

            <button
              className="btn-excluir"
              onClick={() => excluirLivro(livro.id)}
              title="Excluir livro"
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Biblioteca;
