import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import Home from '../pages/Home/Home';
import Cadastro from '../pages/Cadastro/Cadastro';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Header from '../components/Header';
import Profile from '../pages/User/Profile';

const PrivateRoute = ({ children }) => {
  const { isLogado } = useUsers();
  
  return isLogado ? children : <Navigate to="/login" />; // caso não esteja logado envia para o login (mas tem acesso ao home e ao cadastro)
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header /> {/** Foi o formato que encontrei para usar o header junto aos outros elementos */}
        <Home />
      </>
    ),
  },
  {
    path: '/home',
    element: (
      <>
        <Header />
        <Home />
      </>
    ),
  },
  {
    path: '/cadastro',
    element: (
      <>
        <Header />
        <Cadastro />
      </>
    ),
  },
  {
    path: '/login',
    element: (
      <>
        <Header />
        <Login />
      </>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <>
        <Header />
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </>
    ),
    // Copyright Jullyano ;)
  },
  {
    path: '/profile',
    element: (
      <>
        <Header />
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      </>
    ),
  },
  {
    path: '/profile/:id',
    element: (
      <>
        <Header />
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      </>
    ),
  }
]);

export default router;
