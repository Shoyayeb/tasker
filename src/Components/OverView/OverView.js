import { Box, Fab, Toolbar } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Tasks from './../Tasks/Tasks';
import AddTaskModal from './../Shared/Modals/AddTaskModal';

const OverView = () => {
    const [open, setOpen] = React.useState(true);
    const fabStyle = {
        position: 'absolute',
        bottom: 16,
        right: 16,
    };
    const fab = {
        color: 'primary',
        sx: fabStyle,
        icon: <AddIcon />,
        label: 'Add',
    }

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
            <Fab sx={fab.sx} aria-label={fab.label} color={fab.color} onClick={() => setOpen(true)}>
                {fab.icon}
            </Fab>
            <Tasks />
            <AddTaskModal open={open} setOpen={setOpen} />
        </Box>
    );
};

export default OverView; 