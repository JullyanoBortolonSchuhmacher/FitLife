import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

const GeneroSelect = ({ control, name, rules, error }) => {
  const [genero, setGenero] = useState('Masculino');

  const handleGeneroChange = (event) => {
    setGenero(event.target.value);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={genero}
      rules={rules}
      render={({ field }) => (
        <Select
          {...field}
          id="genero"
          value={genero}
          onChange={handleGeneroChange}
          error={error}
        >
          <MenuItem value={"Masculino"}>Masculino</MenuItem>
          <MenuItem value={"Feminino"}>Feminino</MenuItem>
          <MenuItem value={"Outro"}>Outro</MenuItem>
        </Select>
      )}
    />
  );
};

GeneroSelect.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default GeneroSelect;