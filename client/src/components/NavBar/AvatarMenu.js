import * as React from 'react';
// import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../Store/Actions/user';
import { useNavigate } from 'react-router-dom';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import CategoryIcon from '@mui/icons-material/Category';

export default function AvatarMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const navigate = useNavigate();

  const login = useSelector(state => state.user.login);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorE2);
  const handleClick = (event) => {
    console.log(login)
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorE2(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>



        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }}>
            <Avatar sx={{ width: 40, height: 38, backgroundColor: 'rgba(17, 22, 91, 0.5)' }} src={'#'} alt="Abdullah Makix" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      // transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      // anchorOrigin={{ horizontal: 'right',  }}
      >

        <MenuItem style={{ width: '200px', }}
          onClick={() => {
            props.setSelectedComponent('MyAccount')
          }}
        >
          <Avatar src={'#'} alt="User" style={{}} /> My Profile
        </MenuItem>
        <Divider />
        <MenuItem style={{}}>
          <ListItemIcon>
            <CategoryIcon fontSize="small" />
          </ListItemIcon>
          My Ads
        </MenuItem>
        <MenuItem style={{}}>
          <ListItemIcon>
            <LocalGroceryStoreIcon fontSize="small" />
          </ListItemIcon>
          WishList
        </MenuItem>
        <MenuItem style={{}}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <span onClick={() => { dispatch(signout()); localStorage.removeItem('auth_token'); navigate('/') }}>Logout</span>
        </MenuItem>
      </Menu>


    </React.Fragment>
  );
}