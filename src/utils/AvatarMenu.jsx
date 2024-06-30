import { useState, useContext } from 'react';
import { IconButton, Avatar, Menu, MenuItem, Tooltip, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const settings = ['Profile', 'Dashboard', 'Logout'];
const defaultAvatar = '/iconesUser/avatar7.jpg';

const AvatarMenu = ({ handleLogin }) => {
  const [anchoredUser, setAnchoredUser] = useState(null);
  const { isLogado, logoutUser, getUser } = useContext(UserContext);
  const navigate = useNavigate();

  const userData = getUser();
  const avatarUrl = localStorage.getItem('userAvatar');
  const avatar = avatarUrl ? avatarUrl : defaultAvatar;

  const handleOpenUserMenu = (event) => {
    setAnchoredUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchoredUser(null);
  };

  const handleMenuItemClick = (setting) => {
    handleCloseUserMenu();
    if (setting.toLowerCase() === 'logout') {
      handleLogin();
      logoutUser();
    } else if (setting.toLowerCase() === 'profile' && userData?.id) {
      navigate(`/profile/${userData.id}`);
    } else {
      navigate(`/${setting.toLowerCase()}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      {isLogado ? (
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="User Avatar" src={avatar} />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Button variant='contained' color="secondary" onClick={() => navigate('/cadastro')} sx={{ marginRight: 2 }}>
              Cadastrar
            </Button>
            <Button variant='outlined' color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
          </Box>
        </>
      )}
      <Menu
        id="menu-appbar"
        anchorEl={anchoredUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchoredUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
            {setting}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AvatarMenu;
