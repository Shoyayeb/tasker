import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginRegister from './Components/LoginRegister/LoginRegister/LoginRegister';
import NavBar from './Components/NavBar/NavBar';
import NotFound from './Components/NotFound/NotFound';
import Root from './Components/Root/Root';
import AuthProvider from './Context/AuthProvider/AuthProvider';
function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/home" element={<Root />} />
          <Route path="/signin" element={<LoginRegister />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
