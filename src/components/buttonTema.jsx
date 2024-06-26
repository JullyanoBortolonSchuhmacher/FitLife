import { useState } from 'react';
import { Button, styled } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const ButtonTema = styled(Button)(() => ({
  padding: 8,
  minWidth: 0,
  alignItems: 'center',
  borderRadius: '8em',
}));

const BotaoTema = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ButtonTema
      onClick={toggleDarkMode}
      variant="text"
      color="inherit"
      startIcon={darkMode ? <LightModeIcon /> : <DarkModeIcon />}
    >
    </ButtonTema>
  );
};

export default BotaoTema;
