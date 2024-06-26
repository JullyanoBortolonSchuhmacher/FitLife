import { Card, Box } from '@mui/material';
import OI from '../../components/buttonTema'

function Dashboard() {
  const nome = "Maria"
  

  return ( 
    <>
    <Box
      margin={5}
    >
      <h1>Dashboard</h1>
      <OI />
      <Card>
        <h2>exercicio 1</h2>
        <p>Feito por {nome}</p>
      </Card>
    </Box>
    </>
   );
}

export default Dashboard;