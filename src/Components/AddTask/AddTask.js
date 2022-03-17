import { Box, Container, Toolbar } from '@mui/material';
import React from 'react';

const AddTask = () => {
    return (
        <div>
            <Box
                component="main"
            >
                <Toolbar />

                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <div>
                        hi this is kontent
                    </div>
                </Container>
            </Box>
        </div>
    );
};

export default AddTask; 