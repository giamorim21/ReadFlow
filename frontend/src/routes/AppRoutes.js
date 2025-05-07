import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../pages/Home';

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
