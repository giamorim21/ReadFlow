import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

const Layout = () => {
  const location = useLocation();
  const hideRoutes = ["/", "/login", "/cadastro", "/resetar-senha"];
  const shouldHideLayout = hideRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Header />}
      <div className="p-6">
        <AppRoutes />
      </div>
      {!shouldHideLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
