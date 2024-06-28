import { createContext, useContext, useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import useTemaGlobal from '../hook/temaGlobal';

const ThemeContext = createContext();

export const TemaProviderComponent = ({ children }) => {
  const [mode, setMode] = useState('');

  useEffect(() => {
    const temaAtual = localStorage.getItem('tema');
    if (temaAtual) {
      setMode(temaAtual);
    } else {
      setMode('light');
    }
  }, []);

  useTemaGlobal(mode);

  const tema = createTheme({
    palette: {
      mode: mode || 'light',
      primary: {
        main: '#7ED4D9',
      },
      secondary: {
        main: mode === 'light' ? '#2B75A4' : '#2472A0',
      },
      background: {
        default: mode === 'light' ? '#BDE7E5' : '#141414',
      },
    },
    typography: {
      color: 'red',
      fontFamily: 'Inter, sans-serif',
    },
    Box: {
      background: mode === 'light' ? '#EEF0F2' : '#141414',
    },
  });

  const isMobile = useMediaQuery(tema.breakpoints.down('sm'));
  const isTablet = useMediaQuery(tema.breakpoints.down('md'));
  const gridColumns = isMobile ? 1 : isTablet ? 2 : 3;
  const gridRows = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <ThemeContext.Provider value={{ tema, mode, setMode, gridColumns, gridRows }}>
      <ThemeProvider theme={tema}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTemaContext = () => useContext(ThemeContext);
