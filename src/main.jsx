import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";

// Rotas
import { RouterProvider } from 'react-router-dom';
import router from './Router/Router';

// Contextos
import { UserProvider } from './context/UserContext';
import { TemaProviderComponent } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TemaProviderComponent>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </TemaProviderComponent>
  </React.StrictMode>
);
