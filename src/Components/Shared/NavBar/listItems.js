import { DeleteForever, DoneAllOutlined, Task } from "@mui/icons-material";
import BarChartIcon from "@mui/icons-material/BarChart";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton to="/tasks" component={Link}>
      <ListItemIcon>
        <Task />
      </ListItemIcon>
      <ListItemText primary="Tasks" />
    </ListItemButton>
    <ListItemButton to="/completed" component={Link}>
      <ListItemIcon>
        <DoneAllOutlined />
      </ListItemIcon>
      <ListItemText primary="Completed" />
    </ListItemButton>
    <ListItemButton to="/stats" component={Link}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Stats" />
    </ListItemButton>
    <ListItemButton to="/deleted" component={Link}>
      <ListItemIcon>
        <DeleteForever />
      </ListItemIcon>
      <ListItemText primary="Deleted" />
    </ListItemButton>
  </React.Fragment>
);
