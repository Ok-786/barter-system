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
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);
  const login = useSelector(state => state.user.login);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log('event.target')
    console.log(event.target)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      >

        <MenuItem style={{ width: '200px', }}
          onClick={() => {
            navigate(`/userprofile/${user.id}`, { state: { user, isOther: false } })
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
        <MenuItem style={{}} onClick={() => {
          navigate(`/wishlist/${user.id}`, { state: { user } })
        }}>
          <ListItemIcon>
            <LocalGroceryStoreIcon fontSize="small" />
          </ListItemIcon>
          WishList
        </MenuItem>
        <MenuItem style={{}} onClick={() => { dispatch(signout()); localStorage.removeItem('auth_token'); navigate('/') }}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <span >Logout</span>
        </MenuItem>
      </Menu>


    </React.Fragment>
  );
}