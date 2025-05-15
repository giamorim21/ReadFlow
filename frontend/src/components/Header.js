import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  User,
  Home,
  Bookmark,
  BookOpen,
  Settings,
  Search,
  LogOut
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import '../css/Header.css';
import logo from "../assets/icon.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  // Simulação de e-mail do usuário
  const userEmail = "usuario@email.com";

  const handleLogout = () => {
    console.log("Usuário deslogado");
    localStorage.removeItem("token"); // Exemplo
    navigate("/login");
  };

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <Link to="/home" className={`icon ${isActive('/home') ? 'active' : ''}`}>
          <Home size={30} />
        </Link>
        <Link to="/biblioteca" className={`icon ${isActive('/biblioteca') ? 'active' : ''}`}>
          <Bookmark size={30} />
        </Link>
        <Link to="/recomendacoes" className={`icon ${isActive('/recomendacoes') ? 'active' : ''}`}>
          <BookOpen size={30} />
        </Link>
        <Link to="/configuracoes" className={`icon ${isActive('/configuracoes') ? 'active' : ''}`}>
          <Settings size={30} />
        </Link>

        {/* Ícone de usuário com menu suspenso */}
        <div
          className="icon user-icon clickable"
          onClick={() => setShowUserMenu(!showUserMenu)}
          ref={userMenuRef}
        >
          <User size={30} />
          {showUserMenu && (
            <div className="user-menu">
              <p className="user-email">{userEmail}</p>
              <button className="logout-button" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
