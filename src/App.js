import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import NotFound from './Components/NotFound/NotFound';
import Root from './Components/Root/Root';
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/home" element={<Root />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
