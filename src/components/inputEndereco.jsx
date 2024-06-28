import { Controller } from 'react-hook-form';
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import estados from '../utils/estados.json'; 

const EnderecoInput = ({ control, name, rules, error, errorMessage }) => (
  <>
    <Typography color='inherit'>Endereço</Typography>
    <Controller
      name={`${name}.cep`}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              {...field}
              id="cep"
              label="CEP"
              type="tel"
              variant="standard"
              autoComplete="off"
              inputProps={{ maxLength: 8 }}
              error={error}
              helperText={errorMessage}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              name={`${name}.rua`}
              control={control}
              rules={rules}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="rua"
                  label="Rua"
                  variant="standard"
                  fullWidth
                  autoComplete="off"
                  error={error}
                  helperText={errorMessage}
                />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl variant="standard" error={error}>
              <InputLabel id="estado-label">UF</InputLabel>
              <Controller
                name={`${name}.estado`}
                control={control}
                rules={rules}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="estado-label"
                    id="estado"
                    label="UF"
                  >
                    {estados.map((estado) => (
                      <MenuItem key={estado.value} value={estado.value}>
                        {estado.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {error && <p>{errorMessage}</p>}
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Controller
              name={`${name}.cidade`}
              control={control}
              rules={rules}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="cidade"
                  label="Cidade"
                  variant="standard"
                  autoComplete="off"
                  error={error}
                  helperText={errorMessage}
                />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              name={`${name}.numero`}
              control={control}
              rules={rules}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="numero"
                  type="number"
                  label="Número"
                  variant="standard"
                  autoComplete="off"
                  inputProps={{ maxLength: 6 }}
                  error={error}
                  helperText={errorMessage}
                />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              name={`${name}.bairro`}
              control={control}
              rules={rules}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="bairro"
                  label="Bairro"
                  variant="standard"
                  autoComplete="off"
                  error={error}
                  helperText={errorMessage}
                />
              )}
            />
          </Grid>
        </Grid>
      )}
    />
  </>
);

EnderecoInput.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default EnderecoInput;
