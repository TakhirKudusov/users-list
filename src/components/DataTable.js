import { useState, useContext, useEffect } from 'react';
import { InstanceContext } from '../context/InstanceContext';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import { flushSync } from 'react-dom';
import DeleteModal from './modals/DeleteModal';
import EditModal from './modals/EditModal';

//columns' names
const columns = [
    { 
        id: 'id', 
        label: 'Id', 
        minWidth: 10 
    },
    { 
        id: 'name', 
        label: 'Name', 
        minWidth: 170 },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'gender',
        label: 'Gender',
        minWidth: 60,
        align: 'right',
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 60,
        align: 'right',
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 70,
        align: 'right',
    }
];
//component function
export default function DataTable(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    //axios instance
    const context = useContext(InstanceContext)
    //getting users data
    useEffect(() => {
        context.instance.get(context.baseUrl)
            .then(resp => {
                flushSync(() => context.setUsersData(prev => resp.data)) 
                flushSync(() => context.setModifyedUsersData(prev => resp.data)) 
            })
            .catch(error => console.error(error))
            //.finally(() => console.log(context.modifyedUsersData))
    }, [])

    //set data view
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpenDelete = () => context.setOpenDelete(true);
    const handleOpenEdit = () => {
        context.setIsEmailValid(true)
        context.setIsNameValid(true)
        context.setIsEmailValidOnFetch(true)
        context.setOpenEdit(true)
    }

    const handleSetSelectedDataToEdit = (id, option) => {
        return context.modifyedUsersData.filter(userToEdit => {
            if (userToEdit.id === id) {
                return userToEdit
            }
        })[0][option]
    }

    return <>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 1440 }}>
                <Table size="small" stickyHeader aria-label="users' data">
                    {context.modifyedUsersData ? <TableHead>
                        <TableRow id='table-head'>
                            {columns.map((column) => (
                                <TableCell className='head-cell'
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead> : null}
                    <TableBody id='table-body'>
                        {context.modifyedUsersData ? context.modifyedUsersData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .filter(row => {
                                if(context.filter.gender) {
                                    if (row.gender === context.filter.gender) {
                                        return row
                                    }
                                    return
                                }
                                return row
                            })
                            .filter(row => {
                                if (context.filter.status) {
                                    if (row.status === context.filter.status) {
                                        return row
                                    }
                                    return
                                }
                                return row
                            })
                            .sort((a, b) => a.id > b.id ? 1 : -1)
                            .map(row => {
                                return (
                                    <TableRow className='data-row' hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return value ? (
                                                <TableCell className='table-cell' key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            ) :
                                                <TableCell key={column.id} align={column.align}>
                                                    <IconButton aria-label="edit" size="small" onClick={() => {
                                                        context.setSelectedUserId(row.id)
                                                        context.setGenderToEdit(handleSetSelectedDataToEdit(row.id, 'gender'))
                                                        context.setStatusToEdit(handleSetSelectedDataToEdit(row.id, 'status'))
                                                        context.setNameToEdit(handleSetSelectedDataToEdit(row.id, 'name'))
                                                        context.setEmailToEdit(handleSetSelectedDataToEdit(row.id, 'email'))
                                                        handleOpenEdit()
                                                    }}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="delete" size="small" onClick={() => {
                                                        context.setSelectedUserId(row.id)
                                                        handleOpenDelete()
                                                    }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                        })}
                                    </TableRow> 
                                )
                            }) : <CircularProgress id='loading-spinner' color="inherit" /> }
                    </TableBody>
                </Table>
            </TableContainer>
            {context.modifyedUsersData && <TablePagination
                rowsPerPageOptions={[25, 50]}
                component="div"
                count={context.modifyedUsersData && context.modifyedUsersData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />}
        </Paper>
        <DeleteModal />
        <EditModal />
    </>
}