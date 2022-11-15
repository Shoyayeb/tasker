import { ThemeProvider } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import { Box, createTheme, CssBaseline, Fab, Toolbar } from "@mui/material";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import LoginRegister from "./Components/LoginRegister/LoginRegister/LoginRegister";
import OverView from "./Components/OverView/OverView";
import AddTaskModal from "./Components/Shared/Modals/AddTaskModal";
import ErrorModal from "./Components/Shared/Modals/ErrorModal";
import NavBar from "./Components/Shared/NavBar/NavBar";
import Test from "./Components/Test/Test";
import useAuth from "./Hooks/useAuth";
function App() {
  const mdTheme = createTheme();
  const { user, setOpen } = useAuth();

  const fabStyle = {
    position: "absolute",
    bottom: 16,
    right: 16,
  };
  const fab = {
    color: "primary",
    sx: fabStyle,
    icon: <AddIcon />,
    label: "Add",
  };
  return (
    <div>
      <Router>
        <ThemeProvider theme={mdTheme}>
          <Routes>
            <Route path="/" element={<Navigate to="/signin" />} />
            {user.uid ? (
              <Route path="/signin" element={<Navigate to="/tasks" />} />
            ) : (
              <Route path="/signin" element={<LoginRegister />} />
            )}
            <Route path="/*" element={<div>not found</div>} />
            {/* <Route
              path="*"
              element={<Navigate to={user.uid ? "/tasks" : "/signin"} />}
            /> */}
          </Routes>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <ErrorModal />
            {user.uid ? <NavBar /> : ""}
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
                width: "100%",
              }}
            >
              <Toolbar />
              <Fab
                sx={fab.sx}
                aria-label={fab.label}
                color={fab.color}
                onClick={() => setOpen(true)}
              >
                {fab.icon}
              </Fab>
              <Routes>
                <Route path="/tasks" element={<OverView />} />
                <Route path="/completed" element={<Test />} />
              </Routes>
              {/* {user.uid && (
                  <>
                    <Route path="/" element={<OverView />} />
                    <Route path="/tasks" element={<OverView />} />
                    <Route path="/completed" element={<Test />} />
                  </>
                )} */}
              <AddTaskModal
              // open={open}
              // setOpen={setOpen}
              // handleTaskSubmit={handleTaskSubmit}
              // taskDetails={taskDetails}
              />
            </Box>
          </Box>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
