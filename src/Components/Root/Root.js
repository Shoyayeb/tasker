import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, CssBaseline } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddTask from '../AddTask/AddTask';
import LoginRegister from '../LoginRegister/LoginRegister/LoginRegister';
import NotFound from '../NotFound/NotFound';
import Footer from '../Shared/Footer/Footer';
import NavBar from '../Shared/NavBar/NavBar';

const Root = () => {
    const mdTheme = createTheme();
    return (
        <div>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<AddTask />} />
                        <Route path="/home" element={<AddTask />} />
                        <Route path="/signin" element={<LoginRegister />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer sx={{ pt: 4 }} />
                </Box>
            </ThemeProvider>
        </div>
    );
};

export default Root;