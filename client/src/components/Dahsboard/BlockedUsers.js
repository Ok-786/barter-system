import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { axiosGetAllUsers, axiosReportAction } from '../../utils/Api';
import { toast } from 'react-toastify';



export default function BlockedUsers() {
    const [users, setUsers] = React.useState([]);
    const [action, setAction] = React.useState([]);


    const getAllUsersHandler = async () => {

        const temp = await axiosGetAllUsers();

        console.log(temp.data)
        setUsers(temp.data.users);
    }
    React.useEffect(() => {
        getAllUsersHandler();
    }, [action])

    const handleReport = async (row) => {
        setAction(false)

        const data = {
            email: row.email,
            type: 'remove'
        }
        await axiosReportAction(data)
        toast.success('User status set to active!!')


        setAction(true)
    }

    return (
        <div>
            <h2>BlockedUsers</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }}>Users</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            row.status == false && <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar />&nbsp;{row.name}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.status != false ? <Button variant='outlined' color="success" size="small"> Active</Button> : <Button variant='outlined' size="small" color="error">Blocked</Button>}</TableCell>
                                <TableCell align="right"><IconButton onClick={() => handleReport(row)}><RemoveIcon color="success" /></IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
