import { createContext, useContext, useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import useTemaGlobal from '../hook/temaGlobal';

const ThemeContext = createContext();

export const TemaProviderComponent = ({ children }) => {
  const [mode, setMode] = useState(() => {
     return localStorage.getItem('tema') || 'dark'; //pega o tema do localStorage
  });

  useEffect(() => {
    localStorage.setItem('tema', mode); //manda o tema pro localStorage (também)
  }, [mode]);

  useTemaGlobal(mode); //define o modo para o uso do tema abaixo

  const tema = createTheme({ //tema Global(mui)
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

  const isMobile = useMediaQuery(tema.breakpoints.down('sm')); //define o tamanho das colunas/rows para as telas
  const isTablet = useMediaQuery(tema.breakpoints.down('md'));
  const colunas = isMobile ? 1 : isTablet ? 2 : 3;
  //remocção do gridRows (não estava sendo usado)

  return (
    <ThemeContext.Provider value={{ tema, mode, setMode, colunas }}>
      <ThemeProvider theme={tema}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTemaContext = () => useContext(ThemeContext);
