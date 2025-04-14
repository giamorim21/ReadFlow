import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes e páginas
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/").then((res) => {
      setMsg(res.data.message);
    });
  }, []);

  return (
    <Router>
      <Header />
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">{msg}</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Adicione mais rotas aqui depois */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
