import { useState, useEffect } from 'react';
import { Box, Typography, Button, Avatar, Paper } from '@mui/material';
import { useUsers } from '../../context/UserContext';
import PopupAtualizarCadastro from '../../utils/PopupAtualizarCadastro';
import SyncIcon from '@mui/icons-material/Sync';

const Profile = () => {
  const { getUserById, updateUser } = useUsers();
  const [userData, setUserData] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const user = await getUserById(userId);
        setUserData(user);
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

  const handleSaveData = async (updatedData) => {
    const updatedUser = { ...userData, ...updatedData };
    await updateUser(updatedUser);
    setUserData(updatedUser);
    setOpenEditDialog(false);
  };

  if (!userData) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh'}}>
      <Box sx={{ justifyContent: 'center', px: '8%', py: '3%', borderRadius: '8px'}}>
        <Avatar alt="Imagem de Perfil" src={userData.avatar || '/iconesUser/default_avatar.png'} style={{ width: '100px', height: '100px', marginBottom: '20px' }} />
        <Typography variant="h5">{userData.nome}</Typography>
        <Typography variant="body1">Gênero: {userData.genero}</Typography>
        <Typography variant="body1">Email: {userData.email}</Typography>
        <Typography variant="body1">Endereço:</Typography>
        <Typography variant="body2">{userData.endereco?.rua}, {userData.endereco?.numero}</Typography>
        <Typography variant="body2">{userData.endereco?.bairro}</Typography>
        <Typography variant="body2">{userData.endereco?.cidade} - {userData.endereco?.estado}, CEP: {userData.endereco?.cep}</Typography>

        <Button
          sx={{ marginTop: '20px', padding: '1rem', fontSize: '1.2em' }}
          variant="contained"
          color="primary"
          onClick={handleEditOpen}
          startIcon={<SyncIcon icon={SyncIcon} />}
        >
          Alterar Dados
        </Button>
        <PopupAtualizarCadastro
          open={openEditDialog}
          onClose={handleEditClose}
          onSave={handleSaveData}
          userData={userData}
        />
      </Box>
    </Paper>
  );
}

export default Profile;
