import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const InputCpf = ({ control, name, rules, error, errorMessage }) => {
  const [cpf, setCpf] = useState('');

  const handleCpfChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, '');

    if (value.length === 0) {
      setCpf('');
    } else if (value.length <= 3) {
      setCpf(value);
    } else if (value.length <= 6) {
      setCpf(`${value.slice(0, 3)}.${value.slice(3)}`);
    } else if (value.length <= 9) {
      setCpf(`${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`);
    } else if (value.length <= 11) {
      setCpf(`${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          id="cpf"
          type='tel'
          label="CPF"
          variant="standard"
          autoComplete="off"
          value={cpf}
          onChange={(event) => {
            handleCpfChange(event);
            field.onChange(event);
          }}
          inputProps={{ maxLength: 14 }}
          error={fieldState.invalid? error : false}
          helperText={fieldState.invalid? errorMessage : ''}
        />
      )}
    />
  );
};

InputCpf.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default InputCpf;