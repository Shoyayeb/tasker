import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { IconButton, Skeleton, Tooltip } from '@mui/material';
import { Delete } from '@mui/icons-material';

const Tasks = ({ handleRemoveTask, rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper style={{ height: "auto", width: '95%', }} container spacing={3} sx={{ my: 4, mx: "auto", px: 3 }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" >
                                Task
                            </TableCell>
                            <TableCell align="right" colSpan={1}>
                                Added Time
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {rows ? <TableBody style={{}}>
                        {rows
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                        <TableCell align="left" >
                                            <Tooltip title="Delete">
                                                <IconButton onClick={() => handleRemoveTask(row._id)}>
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="left">{row.Task}</TableCell>
                                        <TableCell align="right">{row.Time.slice(0, 5)}</TableCell>

                                    </TableRow>
                                );
                            })}
                    </TableBody> : <div>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} /></div>}
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default Tasks; 