import { useEffect } from 'react';

const aplicarTema = (mode) => {
  const root = document.documentElement;
  if (mode === 'dark') {
    root.style.setProperty('--background-color', '#141414');
    root.style.setProperty('--text-color', '#fff');
  } else {
    root.style.setProperty('--background-color', '#ffffff');
    root.style.setProperty('--text-color', '#000');
  }
};

const useTemaGlobal = (mode) => {
  useEffect(() => {
    aplicarTema(mode);
    localStorage.setItem('tema', mode);
  }, [mode]);
};

export default useTemaGlobal;