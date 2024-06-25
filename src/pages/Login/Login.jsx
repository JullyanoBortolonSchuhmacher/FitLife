import { useForm } from "react-hook-form";
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useEffect, useState } from "react";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
  }

  let [colunas, setColunas] = useState(2);

  useEffect(() => {
    // é o que fica mais bonito 🩻
    setColunas(2); 
  }, []);

  return ( 
    <>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      >
      <Box
        width={colunas === 1 ? "100%" : "50%"}
        boxShadow= '.2em .2em 1em #bbb'
        borderRadius={`${colunas}em`}
        p="5%"
        display='grid'
        gridTemplateColumns={`repeat(${colunas}, auto)`}
        gap={5}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography fontFamily="cursive" fontWeight="900" fontSize="2em">Login</Typography>
          <hr width={'250rem'} />
          <img src="/sapiens.svg" alt="logn" width={'300rem'} />
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <TextField type="email" id="email" label="E-mail" variant="standard" autoComplete="username"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })} 
              error={errors.email ? true : false}
            />
          </Container>
          <Container>
            <TextField type="password" id="senha" label="Senha" variant="standard" autoComplete="current-password"
              {...register('senha', { required: true, minLength: 6 })} 
              error={errors.senha ? true : false}
            />
          </Container>
          <br />
          <Container>
            <Button type="submit" variant="contained">Entrar</Button>
            <Button sx={{marginLeft: '1.5em'}} variant="outlined">voltar</Button>
          </Container>
        </form>
      </Box>
    </Box>
    
    </>
   );
}

export default Login;