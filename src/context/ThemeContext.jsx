import { createContext, useContext, useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const ThemeContext = createContext();

export const TemaProviderComponent = ({ children }) => {
  let [mode, setMode] = useState('');

  useEffect(() => {
    const temaAtual = localStorage.getItem('tema');
    if (temaAtual) {
      setMode(temaAtual);
    }
  }, []);

  const tema = createTheme({
    palette: {
      mode: mode || 'light',
      primary: {
        main: mode === 'light' ? '#A1ACF7' : '#0D21A1',
      },
      secondary: {
        main: mode === 'light' ? '#F4DD90' : '#EEC643',
      },
      background: {
        default: mode === 'light' ? '#EEF0F2' : '#141414',
      },
    },
    typography: {
      color: 'red',
      fontFamily: 'Inter, sans-serif',
    },
    Box: {
      background: mode === 'light' ? '#EEF0F2' : '#141414',
    }
  });

  const isMobile = useMediaQuery(tema.breakpoints.down('sm'));
  const isTablet = useMediaQuery(tema.breakpoints.down('md'));
  const gridColumns = isMobile ? 1 : isTablet ? 2 : 3;
  const gridRows = isMobile ? 1 : isTablet ? 2 : 3

  return (
    <ThemeContext.Provider value={{ tema, mode, setMode, gridColumns, gridRows }}>
      <ThemeProvider theme={tema}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTemaContext = () => useContext(ThemeContext);
