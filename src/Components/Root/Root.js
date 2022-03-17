import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginRegister from '../LoginRegister/LoginRegister/LoginRegister';
import NavBar from '../NavBar/NavBar';
import NotFound from '../NotFound/NotFound';

const Root = () => {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<NotFound />} />
                <Route path="/home" element={<NotFound />} />
                <Route path="/signin" element={<LoginRegister />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default Root;