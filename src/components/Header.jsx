import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BotaoTema from './buttonTema';
import AvatarMenu from '../utils/AvatarMenu';
import { useUsers } from '../context/UserContext';
import { useEffect, useState } from 'react';

const Header = () => {
  const { isLogado, logoutUser } = useUsers();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (isLogado) {
      logoutUser();
    } else {
      navigate('/login');
    }
  };

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };


  return (
    <AppBar color="primary" position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-evenly' }}>
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
            href="/"
            sx={{
              mr: 2,
              mt: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              alignItems: 'center',
            }}
          >
            <img src="iconFitLife.svg" width={'50px'} alt="FitLife" />
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
