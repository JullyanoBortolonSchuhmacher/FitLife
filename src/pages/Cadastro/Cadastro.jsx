import { useForm } from "react-hook-form";
import { Box, Button, Container, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

// inputs importados
import DataNascimentoInput from "../../components/inputDate";
import GeneroSelect from '../../components/inputGender';
import CpfInput from '../../components/inputCpf';
import EnderecoInput from '../../components/inputEndereco';

function Cadastro() {
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem("usuario1", JSON.stringify(data))
    console.log(JSON.parse(localStorage.getItem('usuario1')));
  };

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
          height: '100vh'
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
            <CpfInput
              control={control}
              name="cpf"
              rules={{
                required: 'CPF é obrigatório',
                pattern: {
                  message: 'CPF inválido'
                }
              }}
              error={!!errors.cpf}
              errorMessage={errors.cpf?.message}
            />

            {/* Gênero */}
            <GeneroSelect
              control={control}
              name="genero"
              rules={{ required: 'Gênero é obrigatório' }}
              error={!!errors.genero}
            />
            
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
          {/* Endereço */}
          
          <EnderecoInput
              control={control}
              name="endereco"
              rules={{
                required: 'Endereço é obrigatório'
              }}
              error={!!errors.endereco}
              errorMessage={errors.endereco?.message}
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
