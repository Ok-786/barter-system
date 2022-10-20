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

export default function BlockedUsers() {
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
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar />&nbsp;{row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.status === true ? <Button variant='outlined' color="success" size="small"> Active</Button> : <Button variant='outlined' size="small" color="error">Blocked</Button>}</TableCell>
                                <TableCell align="right"><RemoveIcon color="success" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
