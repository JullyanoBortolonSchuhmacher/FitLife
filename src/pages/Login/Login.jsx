import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../context/UserContext';
import { useTemaContext } from '../../context/ThemeContext';
import { useState } from 'react';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [erroLogin, setErroLogin] = useState("");
  const { gridColumns } = useTemaContext();
  const colunas = gridColumns;
  const navigate = useNavigate();
  const { loginUser } = useUsers();

  const onSubmit = async (data) => {
    setErroLogin(""); // limpa outros erros
    try {
      const user = await loginUser(data.email, data.senha);
      console.log("Login realizado", user);
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      setErroLogin(error.message);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      sx={{
        transition: 'all 0.3s ease'
      }}
    >
      <Box
        width={colunas === 1 ? "100%" : "70%"}
        boxShadow='.2em .2em 1em #bbb'
        borderRadius={`${colunas}em`}
        p="5%"
        display='grid'
        gridTemplateColumns={`repeat(${colunas - 1}, auto)`}
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
            <img src="/sapiens.png" alt="login" width={'300px'} />
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
            {errors.email && <Typography color="error">E-mail inválido</Typography>}

            <TextField type="password" id="senha" label="Senha" variant="standard" autoComplete="current-password"
              {...register('senha', { required: true, minLength: 6 })}
              error={errors.senha ? true : false}
              style={{ marginBottom: '20px', width: '100%' }}
            />
            {errors.senha && <Typography color="error">Senha inválida</Typography>}
            {erroLogin && <Typography color="error">{erroLogin}</Typography>}
            <Box display='grid' gridTemplateColumns={`repeat(${colunas - 1}, auto)`} justifyContent='center' alignContent='center' gap={2}>
              <Button sx={{ borderRadius: 8, paddingX: 5, paddingY: 2 }} type="submit" variant="contained">Entrar</Button>
              <Button sx={{ borderRadius: 8, paddingX: 5, paddingY: 2 }} variant="outlined" href="/dashboard">Voltar</Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
