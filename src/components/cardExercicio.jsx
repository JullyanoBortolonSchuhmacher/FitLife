import { useState } from 'react';
import { Box, Card, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PopupExercicio from '../utils/popupExercicio';
import { useExercicios } from '../context/ExerciciosContext';
import PropTypes from 'prop-types';


const ExercicioCard = ({ exercicio }) => {
  const { deletaExercicio } = useExercicios();
  const userId = localStorage.getItem('userId');

  const [popUpAberto, setPopUpAberto] = useState(false);

  const handleAbrePopUp = () => { //abre o Popup do mui 
    setPopUpAberto(true);
  };

  const handleFechaPopUp = () => { // fecha o popup
    setPopUpAberto(false);
  };

  const handleDeletarConf = () => {
    if (window.confirm('Tem certeza de que deseja deletar este exercício?')) { //abre a confirmação (HTML) para deletar o exercicio
      deletaExercicio(exercicio.id);
    }
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
            <IconButton color="error" onClick={handleDeletarConf}>
              <DeleteIcon />
            </IconButton>
            <IconButton color="secondary" onClick={handleAbrePopUp}>
              <EditIcon />
            </IconButton>
          </Box>
        )}
      </Card>
      <PopupExercicio open={popUpAberto} onClose={handleFechaPopUp} exercicio={exercicio} />
    </>
  );
};

ExercicioCard.propTypes = {
  exercicio: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    duracao: PropTypes.number.isRequired,
    descricao: PropTypes.string,
    dataCriacao: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExercicioCard;
