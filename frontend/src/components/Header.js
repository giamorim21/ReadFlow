import { Link, useLocation } from 'react-router-dom';
import {
  User,
  Home,
  Bookmark,
  BookOpen,
  Settings,
  Search
} from 'lucide-react';
import '../css/Header.css';
import logo from "../assets/icon.png";

const Header = () => {
  const location = useLocation(); // para detectar rota atual

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-img" />
        <h1 className="logo">ReadFlow</h1>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar livros, autores, gêneros..."
          className="search-input"
        />
        <Search size={20} className="search-icon" />
      </div>

      <div className="left-icons">
        <Link
          to="/home"
          className={`icon ${isActive('/home') ? 'active' : ''}`}
        >
          <Home size={30} />
        </Link>
        <Link
          to="/biblioteca"
          className={`icon ${isActive('/biblioteca') ? 'active' : ''}`}
        >
          <Bookmark size={30} />
        </Link>
        <Link
          to="/recomendacoes"
          className={`icon ${isActive('/recomendacoes') ? 'active' : ''}`}
        >
          <BookOpen size={30} />
        </Link>
        <Link
          to="/configuracoes"
          className={`icon ${isActive('/configuracoes') ? 'active' : ''}`}
        >
          <Settings size={30} />
        </Link>
        <div className="icon user-icon">
          <User size={30} />
        </div>
      </div>
    </header>
  );
};

export default Header;
