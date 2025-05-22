import React, { useState } from 'react';
import { FaSave, FaSignOutAlt, FaTrash, FaKey } from 'react-icons/fa';
import '../css/Configuracao.css';

const Configuracao = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificacoes, setNotificacoes] = useState(true);
  const [showSenhaModal, setShowSenhaModal] = useState(false);
  const [showApagarModal, setShowApagarModal] = useState(false);
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const salvarConfiguracoes = () => {
    alert('Configurações salvas!');
  };

  const salvarNovaSenha = () => {
    if (novaSenha === confirmarSenha) {
      alert('Senha alterada com sucesso!');
      fecharModalSenha();
    } else {
      alert('As senhas não coincidem.');
    }
  };

  const apagarConta = () => {
    alert('Conta apagada!');
    fecharModalExcluir();
  };

  const sairConta = () => {
    alert('Você saiu da conta.');
    // Redirecionar para login, se necessário
  };

  const fecharModalSenha = () => {
    setShowSenhaModal(false);
    setNovaSenha('');
    setConfirmarSenha('');
  };

  const fecharModalExcluir = () => {
    setShowApagarModal(false);
  };

  return (
    <main className="config-container">
      <h1 className="config-title">⚙️ Configurações</h1>
      <h2 className="section-title">Informações da Conta</h2>

      <div className="config-group">
        <label>Alterar nome de usuário</label>
        <input type="text" placeholder="Izabelle Silva" />
      </div>

      <div className="config-group">
        <label>Email cadastrado:</label>
        <input type="email" placeholder="izabelle@email.com" />
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

      <button onClick={salvarConfiguracoes} className="botao">
        <FaSave /> Salvar alterações
      </button>

      <h2 className="section-title">Ações</h2>

      <div className="config-buttons-column">
        <button onClick={() => setShowSenhaModal(true)} className="botao">
          <FaKey /> Alterar senha
        </button>
        <button onClick={sairConta} className="botao">
          <FaSignOutAlt /> Sair da conta
        </button>
        <button onClick={() => setShowApagarModal(true)} className="botao">
          <FaTrash /> Apagar conta
        </button>
      </div>

      {/* Modal de Alterar Senha */}
      {showSenhaModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Alterar Senha</h2>
            <input
              type="password"
              placeholder="Nova senha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmar nova senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="cancelar-btn" onClick={fecharModalSenha}>
                Cancelar
              </button>
              <button className="confirmar-btn" onClick={salvarNovaSenha}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Apagar Conta */}
      {showApagarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirmar exclusão</h2>
            <p>Tem certeza de que deseja apagar sua conta? Essa ação é irreversível.</p>
            <div className="modal-buttons">
              <button className="cancelar-btn" onClick={fecharModalExcluir}>
                Cancelar
              </button>
              <button className="confirmar-btn" onClick={apagarConta}>
                Apagar Conta
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Configuracao;
