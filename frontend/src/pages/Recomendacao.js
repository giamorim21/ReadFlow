import { useNavigate } from 'react-router-dom';
import '../css/Recomendacoes.css';
import placeholderImage from '../assets/livro.jpeg';

const livrosRecomendados = [
  { id: 1, titulo: '1984', imagem: placeholderImage },
  { id: 2, titulo: 'Dom Casmurro', imagem: placeholderImage },
  { id: 3, titulo: 'O Hobbit', imagem: placeholderImage },
  { id: 4, titulo: 'Orgulho e Preconceito', imagem: placeholderImage },
  { id: 5, titulo: 'Grande Sertão: Veredas', imagem: placeholderImage },
  { id: 6, titulo: 'O Pequeno Príncipe', imagem: placeholderImage },
  { id: 7, titulo: 'Harry Potter', imagem: placeholderImage },
  { id: 8, titulo: 'Memórias Póstumas de Brás Cubas', imagem: placeholderImage },
];

const Recomendacoes = () => {
  const navigate = useNavigate();

  const salvarNaBiblioteca = (livro) => {
    // Aqui você pode salvar no estado, API ou localStorage
    alert(`"${livro.titulo}" foi salvo na sua biblioteca!`);
  };

  const irParaDetalhes = (id) => {
    navigate(`/livro/${id}`);
  };

  return (
    <div className="recomendacoes-container">
      <h1>📚 Recomendações</h1>
      <p>Essas são as recomendações de leitura geradas para você:</p>

      <div className="livros-grid">
        {livrosRecomendados.map((livro) => (
          <div key={livro.id} className="livro-card">
            <div onClick={() => irParaDetalhes(livro.id)} className="livro-click-area">
              <img src={livro.imagem} alt={livro.titulo} />
              <h4>{livro.titulo}</h4>
            </div>
            <button onClick={() => salvarNaBiblioteca(livro)} className="botao-salvar">
              Salvar na biblioteca
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recomendacoes;
