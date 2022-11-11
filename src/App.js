import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Completed from "./Components/Completed/Completed";
import LoginRegister from "./Components/LoginRegister/LoginRegister/LoginRegister";
import OverView from "./Components/OverView/OverView";
import ErrorModal from "./Components/Shared/Modals/ErrorModal";
import NavBar from "./Components/Shared/NavBar/NavBar";
import useAuth from "./Hooks/useAuth";
function App() {
  const mdTheme = createTheme();
  const { user } = useAuth();
  console.log(process.env.REACT_APP_API_KEY);
  return (
    <div>
      <Router>
        <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <ErrorModal />
            {user.uid ? <NavBar /> : ""}
            <Routes>
              {!user.uid && (
                <Route path="/signin" element={<LoginRegister />} />
              )}

              {user.uid && (
                <>
                  <Route path="/" element={<OverView />} />
                  <Route path="/home" element={<OverView />} />
                  <Route path="/tasks" element={<OverView />} />
                  <Route path="/completed" element={<Completed />} />
                </>
              )}

              <Route
                path="*"
                element={<Navigate to={user.uid ? "/home" : "/signin"} />}
              />
            </Routes>
          </Box>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
