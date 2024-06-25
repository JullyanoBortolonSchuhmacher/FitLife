import { useState } from 'react';
import { IconButton, Avatar, Menu, MenuItem, Tooltip, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const AvatarMenu = ({ isLogado, handleLogin }) => {
  const [ancorandoUsuario, setAncorandoUsuario] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAncorandoUsuario(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAncorandoUsuario(null);
  };

  const handleMenuItemClick = (setting) => {
    handleCloseUserMenu();
    if (setting.toLowerCase() === 'logout') {
      handleLogin();
    } else {
      navigate(`/${setting.toLowerCase()}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      {isLogado ? (
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Button variant='contained' color="inherit" onClick={() => navigate('/cadastro')}>
            Cadastrar
          </Button>
          <Button variant='outlined' color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
        </>
      )}
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={ancorandoUsuario}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(ancorandoUsuario)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AvatarMenu;
