import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import SignUp from './pages/SignUp';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage type="login" />} />
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </Router>

  );
}

export default App;
