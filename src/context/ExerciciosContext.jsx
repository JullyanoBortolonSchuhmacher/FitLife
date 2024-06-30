import { createContext, useState, useContext, useEffect } from 'react';
import { apiUrl } from '../config';

const ExerciciosContext = createContext();

export const useExercicios = () => useContext(ExerciciosContext);

export const ExerciciosProvider = ({ children }) => {
  const [exercicios, setExercicios] = useState([]);

  useEffect(() => {
    fetchExercicios();
  }, []);

  const fetchExercicios = async () => {
    const response = await fetch(`${apiUrl}/exercicios`);
    const data = await response.json();
    setExercicios(data);
  };

  const addExercicio = async (novoExercicio) => {
    const response = await fetch(`${apiUrl}/exercicios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoExercicio),
    });
    const data = await response.json();
    setExercicios((prev) => [...prev, data]);
  };

  const atualizarExercicio = async (id, updatedExercicio) => {
    await fetch(`${apiUrl}/exercicios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedExercicio),
    });
    setExercicios((prev) =>
      prev.map((exercicio) =>
        exercicio.id === id ? { ...exercicio, ...updatedExercicio } : exercicio
      )
    );
  };

  const deletaExercicio = async (id) => {
    await fetch(`${apiUrl}/exercicios/${id}`, { method: 'DELETE' });
    setExercicios((prev) => prev.filter((exercicio) => exercicio.id !== id));
  };

  return (
    <ExerciciosContext.Provider
      value={{ exercicios, fetchExercicios, addExercicio, atualizarExercicio, deletaExercicio }}
    >
      {children}
    </ExerciciosContext.Provider>
  );
};
