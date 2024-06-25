import { useState } from 'react';
import { Switch, styled } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const SwitchTema = styled(Switch)(() => ({
  padding: 8,
  '& .MuiSwitch-switchBase': {
    padding: 4,
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: '#000',
    },
    '&.Mui-checked + .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 0 0/20%)',
    width: 16,
    height: 16,
    '&:before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
}));

const BotaoTema = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <SwitchTema
      checked={checked}
      onChange={handleChange}
      checkedIcon={<LightModeIcon />}
      icon={<DarkModeIcon />}
    />
  );
};

export default BotaoTema;