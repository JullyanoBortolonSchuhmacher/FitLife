import { Card, Container } from '@mui/material';

function Dashboard() {
  const nome = "Maria"
  return ( 
    <>
    <Container>
      <h1>Dashboard</h1>
      <Card>
        <h2>exercicio 1</h2>
        <p>Feito por {nome}</p>
      </Card>
    </Container>
    </>
   );
}

export default Dashboard;