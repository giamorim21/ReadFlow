import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icon.png";
import axios from "axios";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        senha,
        nome: "", // O backend espera o campo nome, mas não é usado no login
      });
      // Salva os dados do usuário logado
      localStorage.setItem("usuario", JSON.stringify(response.data));
      // Redireciona para a home
      navigate("/home");
    } catch (error) {
      alert("Email ou senha inválidos.");
    }
  };

  return (
    <div className="login-page">
      <div className="left-panel">
        <div className="presentation-box">
          <h1 className="system-title">Bem-vindo ao ReadFlow</h1>
          <p className="system-description">
            Sua nova jornada literária começa aqui. O ReadFlow oferece recomendações de livros personalizadas com base nos seus interesses e hábitos de leitura.
          </p>
          <p className="system-description">
            Organize sua estante virtual, acompanhe seu progresso e explore obras que você talvez nunca descobrisse por conta própria. Tudo com apenas alguns cliques.
          </p>
        </div>
      </div>

      <div className="right-panel">
        <img src={logo} alt="Logo" className="logo" />
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin} className="login-form">
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
            <button type="submit">Entrar</button>
          </form>
          <p className="signup-text">
            Não tem conta? <a href="/cadastro">Cadastre-se</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;