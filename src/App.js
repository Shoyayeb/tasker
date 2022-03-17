import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NotFound from './Components/NotFound/NotFound';
import Root from './Components/Root/Root';
import AuthProvider from './Context/AuthProvider/AuthProvider';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Route path="/" element={<Root />} />
        <Route path="tasks/*" element={<Root />} />
        <Route path="*" element={<NotFound />} />
      </Router>
    </AuthProvider >
  );
}

export default App;
