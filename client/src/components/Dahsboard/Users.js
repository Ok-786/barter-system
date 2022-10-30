import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { axiosGetAllUsers } from '../../utils/Api';




export default function Users() {
    const [users, setUsers] = React.useState([]);
    const getAllUsersHandler = async () => {

        const temp = await axiosGetAllUsers();

        console.log(temp.data)
        setUsers(temp.data.users);
    }

    React.useEffect(() => {
        getAllUsersHandler();
    }, [])


    return (
        <div>
            <h2>Users</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }}>Users</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Rating</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar />&nbsp;{row.name}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.rating ? row.rating : 0}</TableCell>
                                <TableCell align="right">{row.status != false ? <Button variant='outlined' color="success" size="small"> Active</Button> : <Button variant='outlined' size="small" color="error">Blocked</Button>}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
