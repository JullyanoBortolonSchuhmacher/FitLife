import { Card, Box } from '@mui/material';

function Dashboard() {
  const nome = "Maria"
  

  return ( 
    <>
    <Box
      margin={5}
    >
      <h1>Dashboard</h1>
      <Card>
        <h2>exercicio 1</h2>
        <p>Feito por {nome}</p>
      </Card>
    </Box>
    </>
   );
}

export default Dashboard;