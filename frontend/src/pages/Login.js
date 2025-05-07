import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para navegação entre páginas

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui você pode fazer a requisição para o back-end para verificar as credenciais
    // Se o login for bem-sucedido:
    navigate('/'); // Redireciona para a página principal do sistema
  };

  
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
        />
        <button type="submit">Entrar</button>
      </form>
      <p>
        Não tem conta? <a href="/cadastro">Cadastre-se</a>
      </p>
    </div>
  );
};

export default Login;
