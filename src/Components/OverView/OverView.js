import { Box, Toolbar } from '@mui/material';
import Tasks from './../Tasks/Tasks';

const OverView = () => {
    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
                width: '100%',
            }}
        >
            <Toolbar />

            <Tasks />
        </Box>
    );
};

export default OverView; 