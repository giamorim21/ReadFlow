import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FaSave, FaSignOutAlt, FaTrash, FaKey } from 'react-icons/fa';
import '../css/Configuracao.css';

const Configuracao = () => {
  // Recupera o usuário logado do localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Estados para nome e email, preenchidos com os dados do usuário logado
  const [nome, setNome] = useState(usuario?.nome || "");
  const [email, setEmail] = useState(usuario?.email || "");
  const [darkMode, setDarkMode] = useState(false);
  const [notificacoes, setNotificacoes] = useState(true);
  const [showSenhaModal, setShowSenhaModal] = useState(false);
  const [showApagarModal, setShowApagarModal] = useState(false);
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Se o usuário mudar (ex: logout/login), atualiza os campos
  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setEmail(usuario.email);
    }
  }, []); // Adicionado 'usuario' como dependência para reagir a mudanças no usuário

  const salvarConfiguracoes = async () => {
  if (!nome.trim()) {
    alert("O nome de usuário não pode ser vazio.");
    return;
  }
  try {
    // Checa se já existe outro usuário com esse nome
    const resp = await axios.get(`http://localhost:8000/usuario/check-nome`, {
      params: { nome, id: usuario.id }
    });
    if (resp.data.exists) {
      alert("Já existe um usuário com esse nome. Escolha outro.");
      return;
    }

    await axios.put(`http://localhost:8000/usuario/${usuario.id}`, {
      nome,
    });
    localStorage.setItem("usuario", JSON.stringify({ ...usuario, nome }));
    alert('Nome de usuário alterado com sucesso!');
  } catch (error) {
    alert(error.response?.data?.detail || "Erro ao salvar configurações.");
  }
};


  const salvarNovaSenha = async () => {
    if (novaSenha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }
    try {
      await axios.put(`http://localhost:8000/usuario/${usuario.id}/senha`, {
        nova_senha: novaSenha,
      });
      alert('Senha alterada com sucesso!');
      fecharModalSenha();
    } catch (error) {
      alert(error.response?.data?.detail || "Erro ao alterar senha.");
    }
  };

  const apagarConta = async () => {
    try {
      await axios.delete(`http://localhost:8000/usuario/${usuario.id}`);
      alert('Conta apagada!');
      localStorage.removeItem("usuario");
      window.location.href = "/login";
    } catch (error) {
      alert(error.response?.data?.detail || "Erro ao apagar conta.");
    }
    fecharModalExcluir();
  };

  const sairConta = () => {
    alert('Você saiu da conta.');
    localStorage.removeItem("usuario");
    window.location.href = "/login";
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
        <label htmlFor="nome">Alterar nome de usuário</label>
        <input
          type="text"
          id="nome" // Adicionado o id para associar ao label
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div className="config-group">
        <label htmlFor="email">Email cadastrado:</label>
        <input
          type="email"
          id="email" // Adicionado o id para associar ao label
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly // Adicionado readOnly para indicar que não pode ser alterado (conforme o texto do label)
        />
      </div>

      <div className="config-switch">
        <label htmlFor="darkMode">Modo noturno</label>
        <label className="switch">
          <input
            type="checkbox"
            id="darkMode" // Adicionado o id para associar ao label
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider" />
        </label>
      </div>

      <div className="config-switch">
        <label htmlFor="notificacoes">Enviar notificações por email</label>
        <label className="switch">
          <input
            type="checkbox"
            id="notificacoes" // Adicionado o id para associar ao label
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