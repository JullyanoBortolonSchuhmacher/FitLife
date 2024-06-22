import { useForm } from "react-hook-form";
import { Box, Button, TextField } from '@mui/material';

function Cadastro() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
  }
  return ( 
    <>
    <h2>CADASTRO</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box> {/*nome*/}
        <TextField type="text" id="nome" label="Nome" variant="standard" autoComplete="name" 
          {...register('name', { required: true })} 
        />
        {errors.name && <p>Nome é obrigatório</p>}
      </Box>

      <Box> {/*dataNAscimento*/}
        <TextField type="date" id="dataNascimento" label="Data de Nascimento" variant="standard" autoComplete="bday" 
          {...register('dataNascimento', { required: true })} 
        />
        {errors.dataNascimento && <p>Data de Nascimento é obrigatório</p>}
      </Box>

      <Box> {/*CPF*/}
        <TextField type="tel" id="cpf" label="CPF" variant="standard" autoComplete="off" 
          {...register('cpf', { required: true, minLength: 11, maxLength: 11})} 
        />
        {errors.cpf && <p>Nome é obrigatório</p>}
      </Box>

      <Box> {/* Genero */}
        <select name="Gênero" id="sexo">
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
          {/* {...register('sexo', { required: true })} */}
        </select>
      </Box>
      <Box>
        <TextField type="email" id="email" label="E-mail" variant="standard" autoComplete="username"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })} 
          />
          {errors.email && <span>Por favor, insira um email válido.</span>}

      </Box>
      <Box>
        <TextField type="password" id="senha" label="Senha" variant="standard" autoComplete="new-password"
          {...register('password', { required: true, minLength: 6 })}
        />
        {errors.password && <span>A senha deve ter no mínimo 6 caracteres.</span>}
      </Box>
      <Box>
        <Button type="submit" variant="contained">Cadastrar</Button>
        <Button variant="outlined">Voltar</Button>
      </Box>
    </form>

    </>
   );
}

export default Cadastro;