import React from 'react';
import '../css/Configuracao.css';

const Configuracao = () => {
  return (
    <main className="config-container">
      <h2>Configurações</h2>

      <section className="config-account">
        <h3>Conta</h3>
        <p><strong>Nome:</strong> Izabelle Silva</p>
        <p><strong>Email:</strong> izabelle@email.com</p>
        <div className="config-buttons">
          <button className="editar">Editar Perfil</button>
          <button className="senha">Alterar Senha</button>
        </div>
      </section>

      <section className="config-grid">
        <div className="config-card">
          <h4>Notificações</h4>
          <button className="ativo">Ativado</button>
        </div>
        <div className="config-card">
          <h4>Modo Escuro</h4>
          <button className="inativo">Desativado</button>
        </div>
        <div className="config-card">
          <h4>Idioma</h4>
          <button className="ativo">Português</button>
        </div>
      </section>
    </main>
  );
};

export default Configuracao;
