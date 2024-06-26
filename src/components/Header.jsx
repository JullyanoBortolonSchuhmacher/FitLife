import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BotaoTema from './buttonTema';
import AvatarMenu from '../utils/AvatarMenu';

const Header = () => {
  const [isLogado, setIsLogado] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('logado');
    setIsLogado(loggedIn === 'true');
  }, []);

  const handleLogin = () => {
    if (isLogado) {
      localStorage.setItem('logado', 'false');
      setIsLogado(false);
    } else {
      navigate('/login');
    }
  };

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <AppBar position="sticky" >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FitLife
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            gap={3}
          >
            <AvatarMenu isLogado={isLogado} handleLogin={handleLogin} />
            <BotaoTema checked={isDarkMode} onChange={handleDarkMode} color="default" />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
