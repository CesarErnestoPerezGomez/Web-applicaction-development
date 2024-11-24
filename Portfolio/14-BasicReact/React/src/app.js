// app.js
import React, { useState } from "react";
// Importar `movies` como exportación por defecto desde `index.js`
import movies from "./index";
import MovieCard from "./moviecard";
import MovieDetail from "./moviecarddetails";
import "./styles/App.css";

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="app">
      {selectedMovie ? (
        <MovieDetail movie={selectedMovie} onBack={handleBackClick} />
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
