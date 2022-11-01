import * as React from 'react';
// import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../Store/Actions/user';
import { useNavigate } from 'react-router-dom';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import CategoryIcon from '@mui/icons-material/Category';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function NotificationMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const navigate = useNavigate();
  const online = useSelector(state => state.user.user);
  // const login = useSelector(state => state.user.login);
  // const dispatch = useDispatch();

  // const online = JSON.parse(localStorage.getItem('user'));

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
            {/* <Avatar sx={{ width: 40, height: 38, backgroundColor: 'rgba(17, 22, 91, 0.5)' }} src={'#'} alt="Abdullah Makix" /> */}
            <div style={{ position: 'relative' }}>
              {online.wish_list.length !== 0 && <div style={{ marginLeft: '80%', position: 'absolute', color: 'white', backgroundColor: 'red', borderRadius: '50%', fontSize: '12px', paddingInline: '.5vh', paddingBlock: '.3vh' }}>{online.wish_list.length}</div>}
              <NotificationsIcon style={{ color: "white", marginTop: '0vh', marginLeft: '2vh' }} />
            </div>
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
              right: 80,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        {online.wish_list ? online.wish_list.map(item => {
          return <>
            <MenuItem style={{ width: '450px', }}

            >
              <p style={{ fontSize: 11 }}>New Product with id: {item} has been added to your wishlist</p>
            </MenuItem>
            <Divider />
          </>
        })
          :
          <>
            <MenuItem style={{ width: '450px', }}

            >
              <p style={{ fontSize: 11 }}>No latest Notifications yet</p>
            </MenuItem>
            <Divider />
          </>
        }
      </Menu>


    </React.Fragment>
  );
}