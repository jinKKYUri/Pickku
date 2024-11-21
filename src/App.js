import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import SignUp from './pages/SignUp';
import MainRouter from './routes/MainRouter';


function App(){
  return (
    <Router>
      <MainRouter/>
    </Router>

  );
}

export default App;
