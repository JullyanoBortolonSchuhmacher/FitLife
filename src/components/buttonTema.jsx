import { Button, styled } from '@mui/material';
import { useTemaContext } from '../context/ThemeContext';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

const ButtonTema = styled(Button)(() => ({
  padding: 8,
  minWidth: 0,
  alignItems: 'center',
  borderRadius: '8em',
}));

const BotaoTema = () => {
  const { mode, setMode } = useTemaContext();
  const IconComponent = mode === 'light' ? DarkModeOutlinedIcon : LightModeOutlinedIcon;

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'; //muda o tema e coloca no localStorage
    setMode(newMode);
    localStorage.setItem('tema', newMode);
  };

  return (
    <ButtonTema
      onClick={toggleTheme}
      variant="text"
      color="inherit"
      startIcon={<IconComponent />}
      sx={{
        transition: 'all 0.3s ease',
      }}
    >
    </ButtonTema>
  );
};

export default BotaoTema;
