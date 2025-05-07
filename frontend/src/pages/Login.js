import React, { useState } from "react";
import logo from "../assets/icon.PNG";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Senha:", senha);
  };

  return (
    <div className="page-container">
      <img src={logo} alt="Logo" className="logo-outside" />
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
  );
}

export default Login;
