import { useNavigate } from 'react-router-dom';
import placeholderImage from '../assets/livro.jpeg';

const livrosUsuario = [
  { id: 101, titulo: 'O Pequeno Príncipe', imagem: placeholderImage, status: 'lido' },
  { id: 102, titulo: 'A Menina que Roubava Livros', imagem: placeholderImage, status: 'lendo' },
  { id: 103, titulo: 'Harry Potter e a Pedra Filosofal', imagem: placeholderImage, status: 'quero ler' },
  { id: 104, titulo: 'Dom Casmurro', imagem: placeholderImage, status: 'lido' },
  { id: 105, titulo: '1984', imagem: placeholderImage, status: 'abandonado' },
  { id: 106, titulo: 'O Senhor dos Anéis', imagem: placeholderImage, status: 'quero ler' },
  { id: 107, titulo: 'A Revolução dos Bichos', imagem: placeholderImage, status: 'lido' },
  { id: 108, titulo: 'O Hobbit', imagem: placeholderImage, status: 'lendo' },
  { id: 109, titulo: 'Cem Anos de Solidão', imagem: placeholderImage, status: 'quero ler' },
  { id: 110, titulo: 'Orgulho e Preconceito', imagem: placeholderImage, status: 'lido' },
];

const Biblioteca = () => {
  const navigate = useNavigate();

  return (
    <main style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>📚 Minha Biblioteca</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '30px',
          paddingBottom: '100px',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        {livrosUsuario.map((livro) => (
          <div
            key={livro.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'center',
              background: '#fdfdfd',
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
            onClick={() => navigate(`/livro/${livro.id}`, { state: livro })}
          >
            <img
              src={livro.imagem}
              alt={`Capa do livro ${livro.titulo}`}
              style={{ width: '100%', height: '270px', objectFit: 'cover', borderRadius: '4px' }}
            />
            <h4 style={{ margin: '10px 0', fontSize: '1rem' }}>{livro.titulo}</h4>
            <span
              style={{
                display: 'inline-block',
                backgroundColor: getBadgeColor(livro.status),
                color: 'white',
                borderRadius: '10px',
                padding: '4px 8px',
                fontSize: '0.75rem',
              }}
            >
              {livro.status}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
};

const getBadgeColor = (status) => {
  switch (status) {
    case 'lido':
      return '#30cd72';
    case 'lendo':
      return '#e3a849';
    case 'quero ler':
      return '#61bffe';
    case 'abandonado':
      return '#000000';
    default:
      return '#007bff';
  }
};

export default Biblioteca;
