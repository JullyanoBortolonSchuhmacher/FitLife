import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"


// rotas
import { RouterProvider } from 'react-router-dom';
import router from './Router/Router';

// colocando numero de colunas --> vai ficar responsivo
localStorage.setItem('colunas', 2);

// usuario --> sera automatico
localStorage.setItem('logado', true);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);