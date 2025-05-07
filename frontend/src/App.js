import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes e páginas
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from './pages/Login';

function AppContent() {
  const [msg, setMsg] = useState("");
  const location = useLocation();

  useEffect(() => {
    axios.get("http://localhost:8000/").then((res) => {
      setMsg(res.data.message);
    });
  }, []);

  const hideHeaderRoutes = ["/login", "/cadastro", "/resetar-senha"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
