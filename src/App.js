import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import MainRouter from "./routes/MainRouter";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <MainRouter/>
    </Router>
  );
}

export default App;
