import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";

// Rotas
import { RouterProvider } from 'react-router-dom';
import router from './Router/Router';

// Contextos
import { UserProvider } from './context/UserContext';
import { TemaProviderComponent } from './context/ThemeContext';
import { ExerciciosProvider } from './context/ExerciciosContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TemaProviderComponent>
      <UserProvider>
        <ExerciciosProvider>
          <RouterProvider router={router} />
        </ExerciciosProvider>
      </UserProvider>
    </TemaProviderComponent>
  </React.StrictMode>
);
