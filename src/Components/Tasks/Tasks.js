import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton, Skeleton, Tooltip } from '@mui/material';
import { Done } from '@mui/icons-material';
import useAuth from '../../Hooks/useAuth';

const Tasks = () => {
    const [handleTaskComplete, tasks] = useAuth();
    return (
        <Paper style={{ height: "auto", width: '95%', }} container spacing={3} sx={{ my: 4, mx: "auto", px: 3 }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" >
                                Complete
                            </TableCell>
                            <TableCell align="left" >
                                Task
                            </TableCell>
                            <TableCell align="right" colSpan={1}>
                                Added Time
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {tasks ? <TableBody style={{}}>
                        {tasks
                            .map((task) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={task._id}>
                                        <TableCell align="left" >
                                            <Tooltip title="Complete">
                                                <IconButton onClick={() => handleTaskComplete(task._id)}>
                                                    <Done />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="left">{task.Task}</TableCell>
                                        <TableCell align="right">{task.Time.slice(0, 5)}</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody> : <TableBody>
                        <TableRow>
                            {/* <TableCell align="center"><Skeleton /></TableCell> */}
                            <Skeleton animation="wave" variant="text" />
                            {/* <Skeleton animation={false} width="100%" /> */}
                        </TableRow>
                    </TableBody>}
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default Tasks; 