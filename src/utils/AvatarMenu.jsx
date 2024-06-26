import { useState, useEffect } from 'react';
import { IconButton, Avatar, Menu, MenuItem, Tooltip, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const AvatarMenu = ({ handleLogin }) => {
  const [ancorandoUsuario, setAncorandoUsuario] = useState(null);
  const [isLogado, setIsLogado] = useState(false); // Estado inicial falso
  const navigate = useNavigate();

  // Função para verificar o localStorage e atualizar o estado isLogado
  const checkLoginStatus = () => {
    const logado = localStorage.getItem('logado');
    setIsLogado(logado === 'true');
  };

  useEffect(() => {
    checkLoginStatus(); 
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      checkLoginStatus(); 
    };

    window.addEventListener('storage', handleStorageChange); 

    return () => {
      window.removeEventListener('storage', handleStorageChange); 
    };
  }, []);

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
      setIsLogado(false); 
      localStorage.setItem('logado', 'false'); 
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
          <Button variant='contained' color="secondary" onClick={() => navigate('/cadastro')} sx={{ marginRight: 4 }}>
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
