import { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState(null)
  const [isLogado, setIsLogado] = useState(() => {
    const estadoLocalStorage = JSON.parse(localStorage.getItem('logado'));
    return estadoLocalStorage ? estadoLocalStorage : false;
  });
  const apiUrl = 'http://localhost:3001';

  useEffect(() => {
    localStorage.setItem('logado', JSON.stringify(isLogado));
  }, [isLogado]);

  const addUser = (user) => {
    fetch(`${apiUrl}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(novoUser => {
      setUsers(antigosUsers => [...antigosUsers, novoUser]);
    });
  };

  const updateUser = (updatedUser) => {
    fetch(`${apiUrl}/usuarios/${updatedUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao atualizar usuário');
      }
      return response.json();
    })
    .then(userAtualizado => {
      setUsers(users.map(user => user.id === userAtualizado.id ? userAtualizado : user));
  
      const userAvatar = localStorage.getItem('userAvatar');
      if (userAvatar && userAvatar.includes('/iconesUser/avatar')) {
        localStorage.setItem('userAvatar', userAtualizado.avatar.toString());
      }
    });
  };

  const deleteUser = (userId) => {
    fetch(`${apiUrl}/usuarios/${userId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao deletar usuário');
      }
      setUsers(users.filter(user => user.id !== userId));
      if (userData && userData.id === userId) {
        setUserData(null);
      }
    });
  };

  const getUser = () => {
    return userData;
  };

  const getUserById = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/usuarios/${userId}`);
      if (!response.ok) {
        throw new Error('Falha ao buscar usuário');
      }
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error.message);
      throw error;
    }
  };

  const loginUser = (email, senha) => {
    return fetch(`${apiUrl}/usuarios`)
      .then(response => response.json())
      .then(users => {
        const user = users.find(user => user.email === email && user.senha === senha);
        if (user) {
          localStorage.setItem('userId', user.id.toString());
          localStorage.setItem('userAvatar', user.avatar.toString());
          setIsLogado(true);
          setUserData(user);
          return user;
        } else {
          setIsLogado(false);
          throw new Error("E-mail ou senha estão errados");
        }
      });
  };

  const logoutUser = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userAvatar');
    setIsLogado(false);
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, getUser, getUserById, loginUser, logoutUser, isLogado }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
