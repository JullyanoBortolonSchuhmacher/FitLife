import { Box, Button, Paper, Typography, styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import backgroundImage from '../../assets/padroes.png'; 

const BlurBackground = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'blur(8px)', 
  zIndex: -1, 
});

const Home = () => {
  return (
    <>
      <BlurBackground />
      <Box
        sx={{
          position: 'relative',
          zIndex: 1, 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          p: 4,
        }}
      >
        <Paper sx={{ p: 4, borderRadius: 2, maxWidth: 600 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Bem-vindo ao FitLife
          </Typography>
          <Typography variant="body1" paragraph>
            FitLife é o seu parceiro ideal para alcançar seus objetivos de condicionamento físico e saúde.
            Crie um perfil, defina suas metas, registre suas atividades físicas e acompanhe seu progresso, tudo em um só lugar.
          </Typography>
          <Box mt={4}>
            <Button variant="contained" color="primary" component={RouterLink} to="/login">
              Comece agora
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Home;
