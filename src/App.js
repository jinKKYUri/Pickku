import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./routes/MainRouter";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <MainRouter />
    </Router>
  );
}

export default App;
