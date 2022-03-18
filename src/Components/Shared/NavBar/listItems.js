import { Dashboard, DoneAllOutlined, Task } from '@mui/icons-material';
import BarChartIcon from '@mui/icons-material/BarChart';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { Link } from 'react-router-dom';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton to="/" component={Link}>
            <ListItemIcon>
                <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Overview" />
        </ListItemButton>
        <ListItemButton to="/" component={Link}>
            <ListItemIcon>
                <Task />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
        </ListItemButton>
        <ListItemButton to="/" component={Link}>
            <ListItemIcon>
                <DoneAllOutlined />
            </ListItemIcon>
            <ListItemText primary="Completed" />
        </ListItemButton>
        <ListItemButton to="/" component={Link}>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Stats" />
        </ListItemButton>
    </React.Fragment>
);