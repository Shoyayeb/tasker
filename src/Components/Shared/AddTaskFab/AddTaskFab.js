import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import AddTaskModal from '../Modals/AddTaskModal';
import useAuth from '../../../Hooks/useAuth';
const AddTaskFab = () => {
    const [setOpen] = useAuth();
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
        <>
            <Fab sx={fab.sx} aria-label={fab.label} color={fab.color} onClick={() => setOpen(true)}>
                {fab.icon}
            </Fab>
            <AddTaskModal />
        </>
    );
};

export default AddTaskFab;