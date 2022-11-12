import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { IconButton } from '@mui/material';

export default function FilterDropDown({ setDistance }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <h5>Filter</h5> &nbsp;<FilterAltIcon color='secondary' fontSize='large' />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                    style: { background: 'purple', color: 'white', borderRadius: '20px' }
                }}

            >
                <MenuItem onClick={() => { setDistance(10); handleClose() }}>10 KM</MenuItem>
                <MenuItem onClick={() => { setDistance(30); handleClose() }}>30 KM</MenuItem>
                <MenuItem onClick={() => { setDistance(500000000000000000000); handleClose() }}>60 KM</MenuItem>
            </Menu>
        </div>
    );
}