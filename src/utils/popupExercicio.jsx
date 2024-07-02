import { useForm, Controller } from 'react-hook-form';
import { useExercicios } from '../context/ExerciciosContext';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Paper, Autocomplete } from '@mui/material';
import exercicioOptions from '../data/tiposExercicio.json';
import { useTemaContext } from '../context/ThemeContext';

const PopupExercicio = ({ open, onClose, exercicio }) => {
  const { control, handleSubmit, register } = useForm({
    defaultValues: exercicio || {},
  });
  const { addExercicio, atualizarExercicio } = useExercicios();
  
  const { colunas } = useTemaContext();

  const onSubmit = (data) => { //pega o id do usuario
    const userId = localStorage.getItem('userId');
    const newData = {
      ...data,
      userId, //não mostra na página 
      dataCriacao: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }), // coloca a data no formato 00/00/0000, 00:00
    };
  
    if (exercicio) {
      atualizarExercicio(exercicio.id, newData); //usa a data
    } else {
      addExercicio(newData); 
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{exercicio ? 'Atualizar Exercício' : 'Criar Novo Exercício'}</DialogTitle>
      <DialogContent>
        <Paper sx={{ padding: '20px', width: colunas <= 1 ? '70%' : '300px', margin: 'auto' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="nome"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={exercicioOptions}
                  renderInput={(params) => (
                    <TextField {...params} label="Nome do Exercício" fullWidth margin="normal" />
                  )}
                  onChange={(_, data) => field.onChange(data)}
                />
              )}
            />
            <TextField
              {...register('descricao')}
              label="Descrição"
              fullWidth
              margin="normal"
            />
            <TextField
              {...register('duracao', { required: false })}
              label="Duração (minutos)"
              type="number"
              fullWidth
              margin="normal"
            />
            <DialogActions>
              <Button type="submit" variant="contained" color="primary">
                {exercicio ? 'Atualizar' : 'Criar'}
              </Button>
              <Button onClick={onClose} color="secondary">
                Cancelar
              </Button>
            </DialogActions>
          </form>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default PopupExercicio;
