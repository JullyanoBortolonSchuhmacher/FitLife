import { Box, Paper, styled } from '@mui/material';

function Dashboard() {
  const nome = "Maria"
  
  const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 120,
    height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
  }));

  return ( 
    <>
    <Box
      margin={5}
    >
      <h1>Dashboard</h1>
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
    <DemoPaper  elevation={8} square={false}>
      <h2>exercicio 1</h2>
      <p>Feito por {nome}</p>
    </DemoPaper>
    </Box>
    </Box>
    </>
   );
}

export default Dashboard;