import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Cadastro from '../pages/Cadastro/Cadastro';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Header from '../components/Header';
import Profile from '../pages/User/Profile';
import Account from '../pages/User/Account';


let logado = JSON.parse(localStorage.getItem("logado"));

const PrivateRoute = ({ children }) => {
  return logado ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
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
          <Account />
          <Profile />
        </PrivateRoute>
      </>
    ),
  },
  {
    path: '/account',
    element: (
      <>
        <PrivateRoute>
          <Account />
        </PrivateRoute>
      </>
    ),
  },
  {
    path: '/profile',
    element: (
      <>
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      </>
    ),
  },
]);

export default router;
