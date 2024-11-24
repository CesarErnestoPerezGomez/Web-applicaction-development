// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';  // No necesitas cambiar esto, ya que está importando correctamente el componente `App`

// Definir la lista de películas
const movies = [
  { id: 1, title: "Movie 1", year: 2020 },
  { id: 2, title: "Movie 2", year: 2021 },
  { id: 3, title: "Movie 3", year: 2022 },
  { id: 4, title: "Movie 4", year: 2023 },
  { id: 5, title: "Movie 5", year: 2024 },
];

// Exportar la lista de películas como exportación por defecto
export default movies;