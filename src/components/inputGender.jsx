import { Controller } from 'react-hook-form';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from '@mui/material';
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
          <FormLabel component="legend">Gênero</FormLabel>
          <RadioGroup
            aria-label="gender"
            {...field}
            value={field.value || ''}
            onChange={field.onChange}
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, auto)',
            }}
          >
            <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />
            <FormControlLabel value="feminino" control={<Radio />} label="Feminino" />
            <FormControlLabel value="outro" control={<Radio />} label="Outro" />
            <FormControlLabel value="prefironaodizer" control={<Radio />} label="Prefiro não dizer" />
          </RadioGroup>
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
