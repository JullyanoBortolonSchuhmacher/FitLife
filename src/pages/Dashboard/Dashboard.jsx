import { useState, useEffect } from 'react';
import { Box, Button, Grid } from '@mui/material';
import ExercicioCard from '../../components/cardExercicio'; 
import PopupExercicio from '../../utils/popupExercicio'; 
import { useUsers } from '../../context/UserContext';
import { useExercicios } from '../../context/ExerciciosContext';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const Dashboard = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { exercicios } = useExercicios();
  const { getUserById } = useUsers();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        await getUserById(userId);
      }
    };

    fetchUser();
  }, [getUserById]);

  const handleEditOpen = () => {
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
  };

  return (
    <Box marginX='4%'>
      <Button
        sx={{ marginTop: '20px', padding: '1rem', fontSize: '1.2em', borderRadius: 16 }}
        variant="contained"
        color="secondary"
        onClick={handleEditOpen}
        startIcon={<NoteAddIcon />}
      >
        Criar Novo Exercício
      </Button>
      <PopupExercicio
        open={openEditDialog}
        onClose={handleEditClose}
      />
      <Box style={{ flexGrow: 1 }}>
        <Grid container spacing={2} marginY={2}>
          {exercicios && exercicios.map((exercicio) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={exercicio.id}>
              <ExercicioCard exercicio={exercicio} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
