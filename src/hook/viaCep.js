import { useState } from 'react';

const useViaCep = () => {
  const [endereco, setEndereco] = useState(null);
  const [error, setError] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const fetchEndereco = async (cep) => {
    setCarregando(true);
    setError(null);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setError('CEP não encontrado.');
      } else {
        setEndereco(data);
      }
    } catch {
      setError('Erro ao buscar o CEP.');
    } finally {
      setCarregando(false);
    }
  };

  return { endereco, error, carregando, fetchEndereco };
};

export default useViaCep;
