import React, { useState } from 'react';
import { FaSave, FaSignOutAlt, FaTrash } from 'react-icons/fa';
import '../css/Configuracao.css';

const Configuracao = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificacoes, setNotificacoes] = useState(true);

  return (
    <main className="config-container">
      <div className="config-group">
        <label>Alterar nome de usuário</label>
        <input type="text" placeholder="Izabelle Silva" />
      </div>

      <div className="config-group">
        <label>Email cadastrado:</label>
        <input type="email" placeholder="izabelle@email.com" disabled />
      </div>

      <div className="config-switch">
        <label>Modo noturno</label>
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider" />
        </label>
      </div>

      <div className="config-switch">
        <label>Enviar notificações por email</label>
        <label className="switch">
          <input
            type="checkbox"
            checked={notificacoes}
            onChange={() => setNotificacoes(!notificacoes)}
          />
          <span className="slider" />
        </label>
      </div>

      <div className="config-actions">
        <button title="Salvar alterações">
          <FaSave />
        </button>
        <button title="Sair da conta">
          <FaSignOutAlt />
        </button>
        <button title="Apagar conta">
          <FaTrash />
        </button>
      </div>
    </main>
  );
};

export default Configuracao;
