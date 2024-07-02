import { useState, useEffect } from 'react';
import { Box, Typography, Button, Avatar, Paper } from '@mui/material';
import { useUsers } from '../../context/UserContext';
import PopupAtualizarCadastro from '../../utils/PopupAtualizarCadastro';
import SyncIcon from '@mui/icons-material/Sync';
import DeleteIcon from '@mui/icons-material/Delete';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [abrirPopUp, setAbrirPopUp] = useState(false);
  const { getUserById, updateUser, deleteUser, logoutUser } = useUsers();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId'); //pega o id do localStorage para realizar a atualização
      if (userId) {
        const user = await getUserById(userId);
        setUserData(user);
      }
    };

    fetchUser();
  }, [getUserById]);

  const handleFecharEdicao = () => { //fecha o popup de edição dos dados do usuario
    setAbrirPopUp(true);
  };

  const handleEditClose = () => { // fecha o popup
    setAbrirPopUp(false);
  };

  const handleSaveData = async (updatedData) => { // salva os dados e atualiza no banco de dados
    const userAtualizado = { ...userData, ...updatedData };
    await updateUser(userAtualizado);
    setUserData(userAtualizado);
    setAbrirPopUp(false);
  };

  const handleDeletarUser = async () => { //deleta o usuario após confirmar na tela pedindo a confirmação
    if (window.confirm('Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.')) {
      await deleteUser(userData.id);
      logoutUser();
    }
  };

  if (!userData) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <Box sx={{ justifyContent: 'center', px: '8%', py: '3%', borderRadius: '8px' }}>
        <Avatar alt="Imagem de Perfil" src={userData.avatar || '/iconesUser/default_avatar.png'} style={{ width: '100px', height: '100px', marginBottom: '20px' }} />
        <Typography variant="h5">{userData.nome}</Typography>
        <Typography variant="body1">Gênero: {userData.genero}</Typography>
        <Typography variant="body1">Email: {userData.email}</Typography>
        <Typography variant="body1">Endereço:</Typography>
        <Typography variant="body2">{userData.endereco?.rua}, {userData.endereco?.numero}</Typography>
        <Typography variant="body2">{userData.endereco?.bairro}</Typography>
        <Typography variant="body2">{userData.endereco?.cidade} - {userData.endereco?.estado}, CEP: {userData.endereco?.cep}</Typography>
        <Box display='flex' gap={3} justifyContent='center'>
          <Button
            sx={{ marginTop: '20px', padding: '1rem', fontSize: '1.2em' }}
            variant="contained"
            color="primary"
            onClick={handleFecharEdicao}
            startIcon={<SyncIcon />}
            >
            Alterar Dados
          </Button>
          <Button
            sx={{ marginTop: '20px', padding: '0.5rem', fontSize: '1.2em' }}
            variant="contained"
            color="error"
            onClick={handleDeletarUser}
            startIcon={<DeleteIcon />}
            >
            Deletar Conta
          </Button>
        </Box>
        <PopupAtualizarCadastro
          open={abrirPopUp}
          onClose={handleEditClose}
          onSave={handleSaveData}
          userData={userData}
          />
      </Box>
    </Paper>
  );
}

export default Profile;
