import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

// o uso do dayjs é por causa da biblioteca MUI onde na documentação demonstrava utilizando ele.

function DataNascimentoInput({ control, name, rules }) {
  const [dataAtual, setDataAtual] = useState(null);
  const { field } = useController({
    control,
    name,
    rules,
    defaultValue: null
  });

  const handleDateChange = (date) => {
    setDataAtual(date);
    field.onChange(date ? dayjs(date).format('YYYY-MM-DD') : ''); //manda pro banco de dados nesse formato
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <DatePicker
        label="Data de Nascimento"
        value={dataAtual}
        onChange={handleDateChange}
        format="DD/MM/YYYY" 
        components={{
          TextField: (props) => <TextField {...props} />
        }}
      />
    </LocalizationProvider>
  );
}

DataNascimentoInput.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object
};

export default DataNascimentoInput;
