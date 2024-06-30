import { useState } from 'react';
import { Box, Card, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PopupExercicio from '../utils/popupExercicio';
import { useExercicios } from '../context/ExerciciosContext';

const ExercicioCard = ({ exercicio }) => {
  const { deletaExercicio } = useExercicios();
  const userId = localStorage.getItem('userId');

  const [openEditPopup, setOpenEditPopup] = useState(false);

  const handleEditClick = () => {
    setOpenEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
  };

  return (
    <>
      <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
          <Typography variant="h5">{exercicio.nome}</Typography>
          <Typography variant="body1" display="flex" alignItems="center">
            <AccessTimeIcon /> {exercicio.duracao}:00m
          </Typography>
        </Box>
        <Typography variant="body1">{exercicio.descricao}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            {exercicio.dataCriacao}
          </Typography>
        </Box>
        {exercicio.userId === userId && (
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 2 }}>
            <IconButton color="error" onClick={() => deletaExercicio(exercicio.id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton color="secondary" onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          </Box>
        )}
      </Card>
      <PopupExercicio open={openEditPopup} onClose={handleCloseEditPopup} exercicio={exercicio} />
    </>
  );
};

export default ExercicioCard;
