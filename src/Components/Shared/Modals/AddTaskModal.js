import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const AddTaskModal = () => {
  const { handleTaskSubmit,open, setOpen } = useAuth();
  const navigate = useNavigate();
  const taskDetails = {};
  const handleClose = () => {
    setOpen(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTaskSubmit(taskDetails);
      navigate("/tasks");
    }
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
            helperText="Press enter to add"
            fullWidth
            variant="standard"
            onKeyDown={(e) => handleKeyDown(e)}
            onChange={(e) => (taskDetails.Task = e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleTaskSubmit(taskDetails);
              navigate("/tasks");
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTaskModal;
