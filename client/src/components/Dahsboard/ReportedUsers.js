import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ReportedUsers() {
    return (
        <div>
            <h2>Users Reported</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }}>Users</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Rating</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar />&nbsp;{row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">1</TableCell>
                                <TableCell align="right"><CheckCircleIcon color="success" /><span style={{ fontSize: '30px' }}>/</span><DoDisturbIcon color="error" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
