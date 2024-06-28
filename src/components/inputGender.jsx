import { Controller } from 'react-hook-form';
import { Select, MenuItem, FormControl, FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';

const GeneroSelect = ({ control, name, rules, error }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
      render={({ field }) => (
        <FormControl error={error}>
          <Select
            {...field}
            id="genero"
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value)}
          >
            <MenuItem value={"Masculino"}>Masculino</MenuItem>
            <MenuItem value={"Feminino"}>Feminino</MenuItem>
            <MenuItem value={"Outro"}>Outro</MenuItem>
          </Select>
          {error && <FormHelperText>Este campo é obrigatório</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

GeneroSelect.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
  error: PropTypes.bool,
};

export default GeneroSelect;
