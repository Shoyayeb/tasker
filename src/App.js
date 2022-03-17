import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './Components/NotFound/NotFound';
import Root from './Components/Root/Root';
import AuthProvider from './Context/AuthProvider/AuthProvider';
function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<Root />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
    </AuthProvider >
    </div >
  );
}

export default App;
