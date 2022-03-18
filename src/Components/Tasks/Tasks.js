import { Container } from '@mui/material';
import React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const initialRows = [
    {
        id: 1,
        name: 'Damien',
        isImportant: true,
    },
    {
        id: 2,
        name: 'Nicolas',
        isImportant: false,
    },
    {
        id: 3,
        name: 'Kate',
        isImportant: false,
    },
];
const Tasks = () => {
    const [rows, setRows] = React.useState(initialRows);

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
                    row.id === id ? { ...row, isImportant: !row.isImportant } : row,
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
    const columns = React.useMemo(
        () => [
            { field: 'name', type: 'string', width: '1/4' },
            { field: 'isImportant', type: 'boolean' },
            {
                field: 'actions',
                type: 'actions',
                width: 80,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={deleteUser(params.id)}
                    />,
                    <GridActionsCellItem
                        icon={<SecurityIcon />}
                        label="Toggle Admin"
                        onClick={toggleAdmin(params.id)}
                        showInMenu
                    />,
                    <GridActionsCellItem
                        icon={<FileCopyIcon />}
                        label="Duplicate User"
                        onClick={duplicateUser(params.id)}
                        showInMenu
                    />,
                ],
            },
        ],
        [deleteUser, toggleAdmin, duplicateUser],
    );
    return (
        <Container style={{ height: 250, width: '100%' }} container spacing={3} sx={{ mt: 4, mb: 4 }}>
            <DataGrid columns={columns} rows={rows} />
        </Container>
    );
};

export default Tasks; 