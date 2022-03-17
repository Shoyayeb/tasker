import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, CssBaseline } from '@mui/material';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import AddTask from '../AddTask/AddTask';
import LoginRegister from '../LoginRegister/LoginRegister/LoginRegister';
import Footer from '../Shared/Footer/Footer';
import ErrorModal from '../Shared/Modals/ErrorModal';
import NavBar from '../Shared/NavBar/NavBar';

const Root = () => {
    const mdTheme = createTheme();
    const { user } = useAuth();
    return (
        <div>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <ErrorModal />

                    <NavBar />

                    <Routes>
                        {!user.uid && (
                            <Route path="/signin" element={<LoginRegister />} />
                        )}

                        {user.uid && (
                            <>
                                <Route path="/" element={<AddTask />} />
                                <Route path="/home" element={<AddTask />} />
                            </>
                        )}

                        <Route path="*" element={<Navigate to={user.uid ? "/home" : "/signin"} />} />
                    </Routes>
                    <Footer sx={{ pt: 4 }} />
                </Box>
            </ThemeProvider>
        </div>
    );
};

export default Root;