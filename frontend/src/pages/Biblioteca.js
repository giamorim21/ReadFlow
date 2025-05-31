import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/Biblioteca.css';
import placeholderImage from '../assets/livro.jpeg';
import Estrelas from '../components/Estrelas';

const STATUS_OPCOES = [
  { label: 'Todos', valor: 'todos' },
  { label: 'Quero Ler', valor: 'quero ler' },
  { label: 'Lendo', valor: 'lendo' },
  { label: 'Lido', valor: 'lido' },
  { label: 'Abandonado', valor: 'abandonado' },
];

const Biblioteca = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();

  const [livros, setLivros] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState('todos');

  // Carrega a biblioteca do localStorage ao montar
  useEffect(() => {
    const biblioteca = JSON.parse(localStorage.getItem(`biblioteca_${usuario.id}`)) || [];
    setLivros(biblioteca);
  }, [usuario.id]);

  // Atualiza o localStorage ao excluir livro
  const excluirLivro = (id) => {
    const novaLista = livros.filter(livro => livro.id !== id);
    setLivros(novaLista);
    localStorage.setItem(`biblioteca_${usuario.id}`, JSON.stringify(novaLista));
  };

  // Filtro funciona corretamente com status em minúsculo
  const livrosFiltrados = filtroStatus === 'todos'
    ? livros
    : livros.filter(livro => livro.status === filtroStatus);

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
        {livros.length === 0 && (
          <p className="msg-sem-livros">
            Sua biblioteca está vazia. Adicione livros marcando-os como "Quero ler", "Lendo" ou "Lido"!
          </p>
        )}
        {livros.length > 0 && livrosFiltrados.length === 0 && (
          <p className="msg-sem-livros">Nenhum livro encontrado para esse filtro.</p>
        )}
        {livrosFiltrados.map((livro) => (
          <div key={livro.id} className="livro-card">
            <img
              src={livro.imagem || placeholderImage}
              alt={`Capa do livro ${livro.titulo}`}
              onClick={() => navigate(`/livro?name=${encodeURIComponent(livro.titulo)}`)}
            />
            <h4 className="livro-titulo">{livro.titulo}</h4>
            <span className={`status-badge status-${livro.status.replace(' ', '-')}`}>
              {livro.status.charAt(0).toUpperCase() + livro.status.slice(1)}
            </span>
            <div className="estrelas-avaliacao">
              <Estrelas nota={livro.nota} />
            </div>
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