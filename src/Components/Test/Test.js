import { Done } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";

const Test = () => {
  const { setOpen } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const tasks = [
    {
      Task: "kitty",
      Time: "2:08:18 PM",
      uid: "n9k7H9rPu3dOHyTxEwGYxa9q67D2",
    },
    {
      Task: "saul",
      Time: "1:08:18 PM",
      uid: "n9k7H9rPu3dOHyTxEwGYxa9q67D2",
    },
    {
      Task: "hello",
      Time: "8:08:18 PM",
      uid: "n9k7H9rPu3dOHyTxEwGYxa9q67D2",
    },
  ];

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
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={task.Time}
                    // style={{
                    //   backgroundColor: randomColor(),
                    // }}
                  >
                    <TableCell align="left">
                      <Tooltip title="Complete">
                        <IconButton
                        // onClick={() => handleTaskComplete(task._id)}
                        >
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

export default Test;
