import { useForm } from "react-hook-form";
import { Box, Button, TextField, Checkbox, Typography, Paper } from '@mui/material';
import DataNascimentoInput from "../../components/inputDate";
import GeneroSelect from '../../components/inputGender';
import CpfInput from '../../components/inputCpf';
import EnderecoInput from '../../components/inputEndereco';
import { useUsers } from '../../context/UserContext'; 
import { useTemaContext } from '../../context/ThemeContext'

function Cadastro() {
  const numeroAleatorio = Math.floor(Math.random() * 7) + 1;

  const { register, handleSubmit, control, formState: { errors }, watch } = useForm({
    defaultValues: {
      nome: '',
      dataNascimento: '',
      cpf: '',
      genero: '',
      email: '',
      senha: '',
      endereco: {
        cep: '',
        rua: '',
        cidade: '',
        estado: '',
        bairro: '',
        numero: '',
      },
      avatar: numeroAleatorio
    }
  });

  const { addUser } = useUsers(); 
  const { gridColumns } = useTemaContext();

  const colunas = gridColumns


  const onSubmit = (data) => {
    const { confirmaEmail, confirmaSenha, ...userData } = data;
    console.log(confirmaEmail, confirmaSenha)
    addUser(userData);
    setTimeout(() => {
      window.location.href = '/login';
      console.log("Cadastrado!")
      alert("Cadastrado com Sucesso! ");
    }, 1500);
  };

   return (
    <>
      <Box display="flex" justifyContent="center" />
      <Paper
        sx={{
          borderRadius: `${colunas}em`,
          height: `${colunas < 2 ? '120vh' : '87vh' }`,
        }}
        elevation={24}
      >
        <Box justifyContent='center' display='flex'>
          <Typography variant="h2">Cadastro</Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mx="8%" display='grid' gridTemplateColumns={`repeat(${colunas}, auto)`} gap={3} sx={{ paddingTop: colunas < 2 ? '4%' : '8%' }}>
            <TextField
              type="text"
              id="nome"
              label="Nome"
              variant="standard"
              autoComplete="name"
              {...register('nome', { required: true, minLength: 3 })}
              error={errors.nome ? true : false}
              helperText={errors.nome ? 'Nome deve ter pelo menos 3 caracteres' : ''}
              fullWidth
            />
            <DataNascimentoInput
              control={control}
              name="dataNascimento"
              rules={{ required: 'Data de nascimento é obrigatória' }}
              error={errors.dataNascimento ? true : false}
            />
            <CpfInput
              control={control}
              name="cpf"
              rules={{ required: 'CPF é obrigatório' }}
              error={!!errors.cpf}
              errorMessage={errors.cpf?.message}
            />
            <GeneroSelect
              control={control}
              name="genero"
              rules={{ required: 'Gênero é obrigatório' }}
              error={!!errors.genero}
            />
            <Box display='grid' gridTemplateColumns={`repeat(${colunas-1}, auto)`} gap={3}>
              <TextField
                type="email"
                id="email"
                label="E-mail"
                variant="standard"
                autoComplete="username"
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                error={errors.email ? true : false}
                helperText={errors.email ? 'E-mail inválido' : ''}
              />
              <TextField
                type="email"
                id="confirmaEmail"
                label="Confirmação de E-mail"
                variant="standard"
                autoComplete="username"
                required
                {...register('confirmaEmail', {
                  required: true,
                  validate: (value) => value === watch('email') || 'Os E-mails não coincidem'
                })}
                error={errors.confirmaEmail ? true : false}
                helperText={errors.confirmaEmail ? errors.confirmaEmail.message : ''}
              />
            </Box>
              <Box display='grid' gridTemplateColumns={`repeat(${colunas-1}, auto)`} gap={3}>
                <TextField
                  type="password"
                  id="senha"
                  label="Senha"
                  variant="standard"
                  autoComplete="new-password"
                  {...register('senha', {
                    required: true,
                    minLength: 6,
                  })}
                  error={errors.senha ? true : false}
                  helperText={errors.senha ? errors.senha.message : ''}
                />
                <TextField
                  type="password"
                  id="confirmaSenha"
                  label="Confirmação de Senha"
                  variant="standard"
                  autoComplete="new-password"
                  required
                  {...register('confirmaSenha', {
                    required: true,
                    validate: (value) => value === watch('senha') || 'As senhas não coincidem'
                  })}
                  error={errors.confirmaSenha ? true : false}
                  helperText={errors.confirmaSenha ? errors.confirmaSenha.message : ''}
                />
            </Box>
          </Box>
          <Box mx="8%">
            <EnderecoInput
              control={control}
              name="endereco"
              rules={{ required: 'Endereço é obrigatório' }}
              error={!!errors.endereco}
              errorMessage={errors.endereco?.message}
            />
          </Box>
          <Box display="flex" alignItems="center" mx="8%">

          </Box>
          <br />
          <Box justifyContent='center' display='flex' alignItems='center'>
            <Checkbox
              id="termos"
              required
            />
            <Typography>Aceito os <a style={{color: 'inherit', fontWeight: '600'}} href="#termos">Termos de Serviço</a></Typography>
            {errors.termos && <Typography color="error">É necessário aceitar os termos</Typography>}
          </Box>
          <Box my={3} justifyContent='center' display='grid' gridTemplateColumns={`repeat(2, auto)`} gap={3}>
            <Button type="submit" variant="contained">Cadastrar</Button>
            <Button variant="outlined" href="/" >Voltar</Button>
          </Box>
        </form>
      </Paper>
    </>
  );
}

export default Cadastro;
