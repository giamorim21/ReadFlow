import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-700 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">ReadFlow 📚</h1>
        <nav className="flex gap-6">
          <Link to="/" className="hover:underline">Início</Link>
          <Link to="/recomendacoes" className="hover:underline">Recomendações</Link>
          <Link to="/perfil" className="hover:underline">Perfil</Link>
          <Link to="/login" className="hover:underline">Login</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
