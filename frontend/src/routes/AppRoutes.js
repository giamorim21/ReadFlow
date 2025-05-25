import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Biblioteca from "../pages/Biblioteca";
import Recomendacoes from "../pages/Recomendacao";
import Configuracoes from "../pages/Configuracao";
import DetalheLivro from '../pages/DetalheLivro';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/home" element={<Home />} />
      <Route path="/biblioteca" element={<Biblioteca />} />
      <Route path="/recomendacoes" element={<Recomendacoes />} />
      <Route path="/configuracoes" element={<Configuracoes />} />
      <Route path="/livro" element={<DetalheLivro />} /> {/* Mudança na rota */}
    </Routes>
  );
};

export default AppRoutes;