import React from "react";
import "./styles/moviecard.css";

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
    </div>
  );
};

export default MovieCard;
