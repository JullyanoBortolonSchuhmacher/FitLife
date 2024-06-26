import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from "react";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  };

  let [colunas, setColunas] = useState(2);

  useEffect(() => {
    const colunasRespon = localStorage.getItem('colunas');
    if (colunasRespon && parseInt(colunasRespon) > 2) {
      setColunas(2); 
    } else {
      setColunas(parseInt(colunasRespon) || 2); 
    }
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Box
        width={colunas === 1 ? "100%" : "50%"}
        boxShadow='.2em .2em 1em #bbb'
        borderRadius={`${colunas}em`}
        p="5%"
        display='grid'
        gridTemplateColumns={`repeat(${colunas}, auto)`}
        gap={5}
      >
        {colunas >= 2 && (
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
          >
            <Typography fontFamily="cursive" fontWeight="900" fontSize="2em">Login</Typography>
            <p>Bem-vindo(a) novamente!</p>
            <hr width={'250px'} /> 
            <Typography fontFamily="Inter" color="#777" fontWeight="400" fontSize="0.8em">Não possuí cadastro? <a href="/cadastro">Cadastre-se aqui</a></Typography>
            <img src="/sapiens.png" alt="logn" width={'300px'} />
          </Box>
        )}

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Box
            my={9}
            display='flex'
            flexDirection='column'
          >
            <TextField type="email" id="email" label="E-mail" variant="standard" autoComplete="username"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              error={errors.email ? true : false}
              style={{ marginBottom: '20px', width: '100%' }}
            />
            <TextField type="password" id="senha" label="Senha" variant="standard" autoComplete="current-password"
              {...register('senha', { required: true, minLength: 6 })}
              error={errors.senha ? true : false}
              style={{ marginBottom: '20px', width: '100%' }}
            />
            <Box>
              <Button type="submit" variant="contained">Entrar</Button>
              <Button sx={{ marginLeft: '1.5em' }} variant="outlined">Voltar</Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
