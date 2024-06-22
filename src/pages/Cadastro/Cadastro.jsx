import { useForm } from "react-hook-form";
import { Box, Button, Container, TextField, Select, MenuItem } from '@mui/material';
import DataNascimentoInput from "../../components/inputDate";
import { useEffect, useState } from 'react';

function Cadastro() {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [genero, setGenero] = useState("Masculino");

  const onSubmit = async (data) => {
    localStorage.setItem("usuario1", JSON.stringify(data))
    console.log(JSON.parse(localStorage.getItem('usuario1')));
  };

  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

  let [colunas, setColunas] = useState(2);
  useEffect(() => {
    const colunasRespon = localStorage.getItem('colunas');
      setColunas(parseInt(colunasRespon)); 
  }, []);

  return (
    <>
    <Box
      display="flex"
      justifyContent="center"
    >
    </Box>
      <Container
        sx={{
          boxShadow: '.2em .2em 1em #bbb',
          borderRadius: `${colunas}em`,
          height: '80vh'
        }}
        >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            py="16%"
            mt="4%"
            mx="8%"
            display='grid'
            gridTemplateColumns={`repeat(${colunas}, auto)`}
            gap={3}
          >
            {/* Nome */}
            <TextField 
              type="text" 
              id="nome" 
              label="Nome" 
              variant="standard" 
              autoComplete="name"
              {...register('nome', { required: true })} 
              error={errors.nome ? true : false}
            />
            
            {/* Data de Nascimento */}
            <DataNascimentoInput 
              control={control}
              name="dataNascimento"
              rules={{ required: 'Data de nascimento é obrigatória' }}
              error={errors.dataNascimento ? true : false}
            />

            {/* CPF */}
            <TextField 
              type="text" 
              id="cpf" 
              label="CPF" 
              variant="standard" 
              autoComplete="off"
              {...register('cpf', {
                required: 'CPF é obrigatório',
                pattern: {
                  value: cpfRegex,
                  message: 'CPF inválido'
                },
                setValueAs: (value) => value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
              })}
              error={errors.cpf ? true : false}
            />

            {/* Gênero */}
            <Select
              id="genero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              {...register('genero', { required: 'Gênero é obrigatório' })}
              error={errors.genero ? true : false}
            >
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Feminino">Feminino</MenuItem>
              <MenuItem value="Outro">Outro</MenuItem>
            </Select>
            
            {/* E-mail */}
            <TextField 
              type="email" 
              id="email" 
              label="E-mail" 
              variant="standard" 
              autoComplete="username"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })} 
              error={errors.email ? true : false}
            />
            
            {/* Senha */}
            <TextField 
              type="password" 
              id="senha" 
              label="Senha" 
              variant="standard" 
              autoComplete="new-password"
              {...register('senha', { required: true, minLength: 6 })}
              error={errors.senha ? true : false}
            />
            
          </Box>
          <br />
          <Box
            justifyContent='center'
            display='grid'
            gridTemplateColumns={`repeat(2, auto)`}
            gap={3}
          >
            <Button type="submit" variant="contained">Cadastrar</Button>
            <Button variant="outlined">Voltar</Button>
          </Box>
        </form>
      </Container>
    </>
  );
}

export default Cadastro;
