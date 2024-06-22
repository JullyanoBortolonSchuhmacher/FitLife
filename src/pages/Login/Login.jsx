import { useForm } from "react-hook-form";
import { Box, Button, Container, TextField } from '@mui/material';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
  }


  return ( 
    <>
    <h2>LOGIN</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Container
      sx={{
        width: 'calc(100vw-8%)',
        height: '100vh',
        borderRadius: 24,
        boxShadow: '.2em .2em 1em rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginX: 'calc(100vw-8%)', 
      }}
      >
        <Box>
          <h1>Login</h1>
        </Box>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            justifyContent: 'center',

          }}
        >
          <Box>
            <TextField type="email" id="email" label="E-mail" variant="standard" autoComplete="username"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })} 
            />
              {errors.email && <span>Por favor, insira um email válido.</span>}        
          </Box>
          <Box>
            <TextField type="password" id="senha" label="Senha" variant="standard" autoComplete="current-password"
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password && <span>A senha deve ter no mínimo 6 caracteres.</span>}
          </Box>
          <br />
          <Box>
            <a href="#">Cadastre-se aqui</a>
          </Box>
          <Box>
            <Button id="Cadastro" type="submit" variant="contained">Entrar</Button>
            <Button id="Voltar" variant="outlined">Voltar</Button>
          </Box>
        </Container>    
      </Container>
    </form>

    </>
   );
}

export default Login;