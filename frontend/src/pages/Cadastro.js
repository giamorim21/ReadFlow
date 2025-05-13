import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/icon.png";
import axios from 'axios';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    // Verifica se a senha e a confirmação de senha são iguais
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem. Tente novamente.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/cadastro', {
        nome,
        email,
        senha,
      });
      navigate('/login');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="login-page">
      <div className="left-panel">
      <div className="presentation-box">
        <h1 className="system-title">Cadastro</h1>
        <p className="system-description">
        Crie sua conta agora e tenha acesso completo ao nosso conteúdo exclusivo. Explore uma vasta biblioteca de recursos, descubra novos materiais e personalize sua experiência para aproveitar ao máximo o que temos a oferecer. Não perca a oportunidade de fazer parte da nossa comunidade e expandir seus conhecimentos!
        </p>
      </div>
      </div>
      <div className="right-panel">
      <img src={logo} alt="Logo" className="logo" />
        <div className="login-container">
          <h2>Cadastro</h2>
          <form className="login-form" onSubmit={handleCadastro}>
            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirmar Senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
            <button type="submit">Cadastrar</button>
          </form>
          <p className="signup-text">
            Já tem conta? <a href="/login">Entrar</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
