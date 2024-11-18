import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
const App = () => {
  return (
      <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage type="login" />} />
        </Routes>
      </Router>
  );
}

export default App;
