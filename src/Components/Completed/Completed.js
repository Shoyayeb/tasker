import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Toolbar } from "@mui/material";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import AddTaskModal from "./../Shared/Modals/AddTaskModal";
import Tasks from "./../Tasks/Tasks";

const Completed = () => {
  const [open, setOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState({});
  const [completedTaskData, setCompletedTaskData] = useState({});
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const { user, db } = useAuth();
  const fabStyle = {
    position: "absolute",
    bottom: 16,
    right: 16,
  };
  const fab = {
    color: "primary",
    sx: fabStyle,
    icon: <AddIcon />,
    label: "Add",
  };
  const handleTaskSubmit = async () => {
    taskDetails.uid = user.uid;
    taskDetails.Done = false;
    taskDetails.Importance = false;
    taskDetails.Time = new Date().toLocaleTimeString();
    taskDetails.Date = new Date().toDateString();
    console.log(taskDetails);
    try {
      const docRef = await addDoc(collection(db, "tasks"), taskDetails);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    axios
      .post(`${process.env.REACT_APP_API_LINK}/addtask`, taskDetails)
      .then(function (res) {
        const url = `${process.env.REACT_APP_API_LINK}/tasks/${user.uid}`;
        axios.get(url).then((data) => {
          window.localStorage.setItem("tasks", JSON.stringify(data.data));
          setTasks(JSON.parse(localStorage.getItem("tasks")));
        });
        setTaskDetails({});
        setOpen(false);
      })
      .catch(function (error) {
        console.log(error);
        setOpen(false);
        setTaskDetails({});
      });
  };
  const handleTaskComplete = (id) => {
    axios.get(`${process.env.REACT_APP_API_LINK}/task/${id}`).then((data) => {
      setCompletedTaskData(data.data);
      completedTaskData.Done = true;
      console.log(data);
      handleRemoveTask(id);
      axios
        .post(
          `${process.env.REACT_APP_API_LINK}/addcompletedtask`,
          completedTaskData
        )
        .then(function (res) {
          const url = `${process.env.REACT_APP_API_LINK}/tasks/${user.uid}`;
          axios.get(url).then((data) => {
            window.localStorage.setItem("tasks", JSON.stringify(data.data));
            setTasks(JSON.parse(localStorage.getItem("tasks")));
          });
          setCompletedTaskData({});
        })
        .catch(function (error) {
          console.log(error);
          setCompletedTaskData({});
        });
    });
  };
  useEffect(() => {
    const url = `${process.env.REACT_APP_API_LINK}/tasks/${user.uid}`;
    axios.get(url).then((data) => {
      setTasks(data.data);
      window.localStorage.setItem("tasks", JSON.stringify(data.data));
      console.log(tasks, "====================================", data.data);
    });
  }, []);
  const handleRemoveTask = (id) => {
    const url = `${process.env.REACT_APP_API_LINK}/tasks/${id}`;
    axios.delete(url).then((data) => {
      console.log(data);
      if (data.data.deletedCount > 0) {
        const remaining = tasks.filter((restTask) => restTask._id !== id);
        setTasks(remaining);
        window.localStorage.setItem("tasks", JSON.stringify(remaining));
      }
    });
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
        width: "100%",
      }}
    >
      <Toolbar />
      <Fab
        sx={fab.sx}
        aria-label={fab.label}
        color={fab.color}
        onClick={() => setOpen(true)}
      >
        {fab.icon}
      </Fab>
      <Tasks
        handleTaskComplete={handleTaskComplete}
        handleRemoveTask={handleRemoveTask}
        tasks={tasks}
      />
      <AddTaskModal
        open={open}
        setOpen={setOpen}
        handleTaskSubmit={handleTaskSubmit}
        taskDetails={taskDetails}
      />
    </Box>
  );
};

export default Completed;
