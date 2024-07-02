import { useState, useEffect, useContext } from 'react';
import { Controller } from 'react-hook-form';
import { TextField, Link } from '@mui/material';
import PropTypes from 'prop-types';
import { UserContext } from '../context/UserContext';
import { apiUrl } from '../config';

const InputCpf = ({ control, name, rules, error, errorMessage }) => {
  const { users } = useContext(UserContext);
  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState('');

  useEffect(() => {
    const checaCpfExistente = async () => {
      const response = await fetch(`${apiUrl}/usuarios`); //pega da config geral (caso mude alguma coisa facilita o uso do fetch)
      const data = await response.json();
      const cpfLista = data.map(user => user.cpf);

      if (cpfLista.includes(cpf)) {
        setCpfError('CPF já cadastrado. Clique aqui para fazer login.'); //caso ja exista esse cpf
      } else {
        setCpfError('');
      }
    };

    if (cpf.length === 14) { 
      checaCpfExistente();
    } else {
      setCpfError('');
    }
  }, [cpf]);

  const handleMudacaCpf = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, '');

    if (value.length === 0) { //separa o valor do cpf para o formato "000.000.000-00"
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
          type="tel"
          label="CPF"
          variant="standard"
          autoComplete="off"
          value={cpf}
          onChange={(event) => {
            handleMudacaCpf(event);
            field.onChange(event);
          }}
          inputProps={{ maxLength: 14 }}
          error={fieldState.invalid || !!cpfError ? error : false}
          helperText={fieldState.invalid || cpfError ? (cpfError || errorMessage) : ''}
          InputProps={{
            endAdornment: cpfError && (
              <Link href="/login" color="error"> {/*caso tenha um cpf ele manda como um erro para fazer o login */}
                {cpfError}
              </Link>
            ),
          }}
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
