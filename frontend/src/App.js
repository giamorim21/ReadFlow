import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Componentes e páginas
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';


function AppContent() {
  const location = useLocation();

  const hideHeaderRoutes = ["/login", "/cadastro", "/resetar-senha"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
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
