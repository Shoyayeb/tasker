import { Done } from "@mui/icons-material";
import { IconButton, Skeleton, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";

const Tasks = () => {
  const { tasks } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const checkCompleted = (task) => {
    if (task.Done) {
      return false;
    }
    return true;
  };

  return (
    <Paper
      style={{ height: "auto", width: "95%" }}
      container
      spacing={3}
      sx={{ my: 4, mx: "auto", px: 3 }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Complete</TableCell>
              <TableCell align="left">Task</TableCell>
              <TableCell align="right" colSpan={1}>
                Added Time
              </TableCell>
            </TableRow>
          </TableHead>
          {tasks ? (
            <TableBody style={{}}>
              {tasks.filter(checkCompleted).map((task) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={task.Time}>
                    <TableCell align="left">
                      <Tooltip title="Complete">
                        <IconButton>
                          <Done />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left">{task.Task}</TableCell>
                    <TableCell align="right">{task.Time.slice(0, 5)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          ) : (
            <div>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </div>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Tasks;
