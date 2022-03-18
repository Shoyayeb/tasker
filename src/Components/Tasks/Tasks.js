import { Container, LinearProgress } from '@mui/material';
import React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';

const initialRows = [
    {

        _id: "6234882acb8220bba0c2b876",
        task: "Add Task",
        uid: "n9k7H9rPu3dOHyTxEwGYxa9q67D2",
        Done: false,
        Importance: false,
        Time: "19:24:55",
        Date: "Fri Mar 18 2022"

    },
    {

        _id: "6234882acb8220bba0c2b876",
        task: "Add Task",
        uid: "n9k7H9rPu3dOHyTxEwGYxa9q67D2",
        Done: false,
        Importance: false,
        Time: "19:24:55",
        Date: "Fri Mar 18 2022"

    },
];
const Tasks = () => {
    const [rows, setRows] = React.useState([]);
    const { user } = useAuth();
    useEffect(() => {
        const url = `https://tasker-web0.herokuapp.com/tasks/${user.uid}`;
        axios.get(url).then((data) => {
            setRows(data.data);
            console.log(rows, '====================================', data.data);
        });
    }, [rows, user.uid]);
    const deleteUser = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            });
        },
        [],
    );

    const toggleAdmin = React.useCallback(
        (id) => () => {
            setRows((prevRows) =>
                prevRows.map((row) =>
                    row._id === id ? { ...row, Done: !row.Done } : row,
                ),
            );
        },
        [],
    );

    const duplicateUser = React.useCallback(
        (id) => () => {
            setRows((prevRows) => {
                const rowToDuplicate = prevRows.find((row) => row.id === id);
                return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
            });
        },
        [],
    );
    const columns = [
        { field: 'task', headerName: 'Column 1', type: 'string', width: 300 },
        // {
        //     field: 'actions',
        //     type: 'actions',
        //     width: 80,
        //     getActions: (params) => [
        //         <GridActionsCellItem
        //             icon={<DeleteIcon />}
        //             label="Delete"
        //             onClick={deleteUser(params._id)}
        //         />,
        //         <GridActionsCellItem
        //             icon={<SecurityIcon />}
        //             label="Toggle Admin"
        //             onClick={toggleAdmin(params._id)}
        //             showInMenu
        //         />,
        //         <GridActionsCellItem
        //             icon={<FileCopyIcon />}
        //             label="Duplicate User"
        //             onClick={duplicateUser(params._id)}
        //             showInMenu
        //         />,
        //     ],
        // },
    ]
    // [deleteUser, toggleAdmin, duplicateUser],

    return (
        <Container style={{ height: 250, width: '100%' }} container spacing={3} sx={{ mt: 4, mb: 4 }}>
            {rows ? <DataGrid columns={[{ field: 'task' }, { field: 'Date' }]} rows={[
                {
                    id: 1,
                    task: rows[0].task,
                    Date: rows[0].Date,
                },
            ]} /> : <LinearProgress />}
        </Container>
    );
};

export default Tasks; 