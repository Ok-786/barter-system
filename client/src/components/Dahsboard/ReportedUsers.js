import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { axiosGetAllUsers, axiosReportAction } from '../../utils/Api';
import { toast } from 'react-toastify';
import ClearIcon from '@mui/icons-material/Clear';


export default function ReportedUsers() {
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

    const handleReport = async (isAdd, row) => {
        setAction(false)
        if (isAdd) {
            const data = {
                email: row.email,
                type: 'add'
            }
            await axiosReportAction(data)
            toast.success('User has Blocked')
        } else {
            const data = {
                email: row.email,
                type: 'remove'
            }
            await axiosReportAction(data)
            toast.success('User has been ignored!')
        }

        setAction(true)
    }

    return (
        <div>
            <h2>Users Reported</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }}>Users</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>No. Reports</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            row.reported && row.status != false &&
                            <TableRow TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar />&nbsp;{row.name}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.noReports ? row.noReports : 0}</TableCell>
                                <TableCell align="right"><IconButton onClick={() => handleReport(true, row)}><CheckCircleIcon color="error" /></IconButton><IconButton onClick={() => handleReport(false, row)}><ClearIcon color="success" /></IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}
