import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { TextField, Grid } from '@mui/material';
import PropTypes from 'prop-types';

const EnderecoInput = ({ control, name, rules, error, errorMessage }) => {
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');

  const handleCepChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, '');

    if (value.length === 0) {
      setCep('');
    } else if (value.length <= 5) {
      setCep(value);
    } else if (value.length <= 8) {
      setCep(`${value.slice(0, 5)}-${value.slice(5)}`);
    }
  };

  const handleNumeroChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    setNumero(value);
  };

  return (
    <>
    <h4>Endereço</h4>
    <Controller
      name={name}
      control={control}
      defaultValue={{
        cep,
        rua,
        cidade,
        estado,
        bairro,
        numero
      }}
      rules={rules}
      render={({ field, fieldState }) => (
        <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            {...field}
            id="cep"
            label="CEP"
            variant="standard"
            autoComplete="off"
            value={cep}
            onChange={handleCepChange}
            inputProps={{ maxLength: 9 }}
            error={fieldState.invalid ? error : false}
            helperText={fieldState.invalid ? errorMessage : ''}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            {...field}
            id="rua"
            label="Rua"
            variant="standard"
            autoComplete="off"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
            error={fieldState.invalid ? error : false}
            helperText={fieldState.invalid ? errorMessage : ''}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            {...field}
            id="estado"
            label="Estado"
            variant="standard"
            autoComplete="off"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            inputProps={{ maxLength: 2 }}
            error={fieldState.invalid ? error : false}
            helperText={fieldState.invalid ? errorMessage : ''}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            {...field}
            id="cidade"
            label="Cidade"
            variant="standard"
            autoComplete="off"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            error={fieldState.invalid ? error : false}
            helperText={fieldState.invalid ? errorMessage : ''}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            {...field}
            id="numero"
            label="Número"
            variant="standard"
            autoComplete="off"
            value={numero}
            onChange={handleNumeroChange}
            inputProps={{ maxLength: 6 }}
            error={fieldState.invalid ? error : false}
            helperText={fieldState.invalid ? errorMessage : ''}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            {...field}
            id="bairro"
            label="Bairro"
            variant="standard"
            autoComplete="off"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            error={fieldState.invalid ? error : false}
            helperText={fieldState.invalid ? errorMessage : ''}
          />
        </Grid>
      </Grid>
      )}
    />
    </>
  );
};

EnderecoInput.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default EnderecoInput;
