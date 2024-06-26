import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Account() {
  return ( 
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '95vh' }}>
      <Typography variant="h3">Parece que você chegou em um lugar que ainda não existe 😅</Typography>
      <Button sx={{ padding: '1rem', fontSize: '2em' }} variant="contained"  color="primary" component={Link} to="/">
        Clique aqui para voltar!
      </Button>
      <img src="/empilhadeira.png" alt="sob-construcao" style={{ marginTop: '20px', maxWidth: '100%' }} />
    </Box>
  );
}

export default Account;
