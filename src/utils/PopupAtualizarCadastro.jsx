import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Typography, Paper } from '@mui/material';
import EnderecoInput from '../components/inputEndereco';
import PropTypes from 'prop-types';
import GeneroSelect from '../components/inputGender';
import SaveIcon from '@mui/icons-material/Save';

const iconsFolder = '/iconesUser/';

const PopupAtualizarCadastro = ({ open, onClose, onSave, userData }) => {
  const { handleSubmit, control, setValue, reset, watch } = useForm({
    defaultValues: {
      nome: userData.nome,
      genero: userData.genero,
      email: userData.email,
      endereco: userData.endereco || {},
      avatar: userData.avatar
    }
  });

  const selectedAvatar = watch("avatar");

  useEffect(() => {
    if (userData) {
      reset({
        nome: userData.nome,
        genero: userData.genero,
        email: userData.email,
        endereco: userData.endereco || {},
        avatar: userData.avatar
      });
    }
  }, [userData, reset]);

  const handleSave = (data) => {
    onSave(data);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(handleSave)}>
        <DialogTitle>Atualizar Dados</DialogTitle>
        <DialogContent>
          <Box display='grid' gridTemplateColumns='repeat(2, auto)' alignItems='center' gap={1.5}>
            <Controller
              name="nome"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  margin="dense"
                  label="Nome"
                  type="text"
                  fullWidth
                />
              )}
            />
            <GeneroSelect
              control={control}
              name="genero"
              rules={{ required: 'Campo obrigatório' }}
              error={false}
            />
          </Box>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Email"
                type="email"
                fullWidth
              />
            )}
          />
          <EnderecoInput
            control={control}
            name="endereco"
            rules={{ required: 'Campo obrigatório' }}
            error={false}
            errorMessage=""
            fullWidth
          />
          <Typography variant="subtitle1" sx={{ marginTop: 2 }}>Escolha um ícone de perfil:</Typography>
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            {Array.from({ length: 7 }, (_, index) => (
              <Grid item key={index} xs={4} md={2} sx={{ alignItems: 'center' }}>
                <Paper
                  elevation={selectedAvatar === `${iconsFolder}avatar${index + 1}.jpg` ? 3 : 1}
                  sx={{
                    padding: '8px',
                    cursor: 'pointer',
                    border: selectedAvatar === `${iconsFolder}avatar${index + 1}.jpg` ? '2px solid teal' : 'none',
                    outline: selectedAvatar === `${iconsFolder}avatar${index + 1}.jpg` ? '2px solid teal' : 'none',
                    transform: selectedAvatar === `${iconsFolder}avatar${index + 1}.jpg` ? 'scale(1.2)' : 'none',
                    transition: 'transform 0.2s'
                  }}
                  onClick={() => setValue('avatar', `${iconsFolder}avatar${index + 1}.jpg`)}
                >
                  <img
                    src={`${iconsFolder}avatar${index + 1}.jpg`}
                    alt={`Ícone ${index + 1}`}
                    style={{ width: '100%', borderRadius: '50%' }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant='contained'>Cancelar</Button>
          <Button type="submit" variant='contained' color="primary" startIcon={<SaveIcon />}>Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

PopupAtualizarCadastro.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    nome: PropTypes.string,
    genero: PropTypes.string,
    email: PropTypes.string,
    endereco: PropTypes.shape({
      cep: PropTypes.string,
      rua: PropTypes.string,
      estado: PropTypes.string,
      cidade: PropTypes.string,
      numero: PropTypes.string,
      bairro: PropTypes.string,
    }),
    avatar: PropTypes.string,
  }).isRequired,
};

export default PopupAtualizarCadastro;
