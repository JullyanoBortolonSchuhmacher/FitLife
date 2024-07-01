import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../context/UserContext';
import { useTemaContext } from '../../context/ThemeContext';
import { useEffect, useState } from 'react';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [erroLogin, setErroLogin] = useState("");
  const { colunas } = useTemaContext();
  const navigate = useNavigate();
  const { loginUser, quantidadeUsers  } = useUsers();

  const [totalUsers, setTotalUsers] = useState(null);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const total = await quantidadeUsers();
        setTotalUsers(total);
      } catch (error) {
        console.error('Erro ao obter quantidade de usuários:', error.message);
      }
    };

    fetchTotalUsers();
  }, [quantidadeUsers]);

  const onSubmit = async (data) => {
    setErroLogin(""); // limpa outros erros
    try {
      const user = await loginUser(data.email, data.senha);
      console.log("Login realizado", user.email, );
      console.log(`Bem vind${user.genero === 'feminino' ? 'a' : 'o'}`, user.nome);

      setTimeout(() => {
        navigate("/dashboard");
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
      <Paper
        sx={{
          paddingY: '50px',
          paddingX: '5%',
          borderRadius: `${colunas}em`,
          display: 'grid',
          gridTemplateColumns: `repeat(${colunas - 1}, 1fr)`,
          gap: 5,
          width: colunas === 1 ? "100%" : "70%",
        }}
        elevation={24}
      >
        {colunas >= 2 && (
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
          >
            <Typography fontFamily="cursive" fontWeight="900" fontSize="2em">Login</Typography>
            <p>Bem-vindo(a) novamente!</p>
            <Typography fontStyle="italic" fontSize="0.9em" fontWeight="300" >Total de usuários em nossa plataforma: {totalUsers}</Typography>
            <hr width={'250px'} />
            <Typography fontFamily="Inter" color="#777" fontWeight="400" fontSize="0.8em">Não possuí cadastro? <a style={{color: 'inherit', fontWeight: '900'}} href="/cadastro">Cadastre-se aqui</a></Typography>
            <img src="/sapiens.png" alt="login" width={'300px'} />
          </Box>
        )}

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Box
            my={5}
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
      </Paper>
    </Box>
  );
}

export default Login;
