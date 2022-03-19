import { Box, Fab, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Tasks from './../Tasks/Tasks';
import AddTaskModal from './../Shared/Modals/AddTaskModal';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';

const OverView = () => {
    const [open, setOpen] = useState(false);
    const [taskDetails, setTaskDetails] = useState({});
    const [rows, setRows] = useState(JSON.parse(window.localStorage.rows));
    const { user } = useAuth();
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
    const handleTaskSubmit = () => {
        taskDetails.uid = user.uid;
        taskDetails.Done = false;
        taskDetails.Importance = false;
        taskDetails.Time = new Date().toLocaleTimeString();
        taskDetails.Date = new Date().toDateString()
        console.log(taskDetails);
        axios
            .post("https://tasker-web0.herokuapp.com/addtask", taskDetails)
            .then(function (res) {
                console.log(res);
                setTaskDetails({});
                setOpen(false);
            })
            .catch(function (error) {
                console.log(error);
                setOpen(false);
                setTaskDetails({});
            });
    };
    useEffect(() => {
        const url = `https://tasker-web0.herokuapp.com/tasks/${user.uid}`;
        axios.get(url).then((data) => {
            setRows(data.data);
            window.localStorage.setItem("rows", JSON.stringify(data.data))
            console.log(rows, '====================================', data.data);
        });
    }, []);
    const handleRemoveTask = (id) => {
        const url = `https://tasker-web0.herokuapp.com/tasks/${id}`;
        fetch(url, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount > 0) {
                    const remaining = rows.filter((restTask) => restTask._id !== id);
                    setRows(remaining);
                }
            });
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
            <Tasks handleRemoveTask={handleRemoveTask} rows={rows} />
            <AddTaskModal open={open} setOpen={setOpen} handleTaskSubmit={handleTaskSubmit} taskDetails={taskDetails} />
        </Box>
    );
};

export default OverView; 