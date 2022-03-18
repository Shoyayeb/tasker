import { Dashboard, Done, DoneAllOutlined, Task } from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import * as React from 'react';
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

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton to="/home" component={Link}>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton>
        <ListItemButton to="/signin" component={Link}>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
        </ListItemButton>
        <ListItemButton to="/" component={Link}>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItemButton>
    </React.Fragment>
);