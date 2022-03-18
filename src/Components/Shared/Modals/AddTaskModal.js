import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const AddTaskModal = ({ open, setOpen }) => {
    const [taskDetails, setTaskDetails] = useState({});
    const { user } = useAuth();
    const handleClose = () => {
        setOpen(false);
    };
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

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To sync tasks properly an active internet connection is required
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Ex: Drink Water"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => taskDetails.task = e.target.value}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleTaskSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddTaskModal;