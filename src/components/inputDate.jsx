import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

function DataNascimentoInput() {
  const [dataAtual, setDataAtual] = useState(dayjs());

  const handleDateChange = (date) => {
    if (date && date.isValid()) {
      setDataAtual(date);
    } else {
      setDataAtual(null);
    }
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

export default DataNascimentoInput;