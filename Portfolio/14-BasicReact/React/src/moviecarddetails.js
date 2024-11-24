import React from "react";
import "./styles/moviedetail.css";

const MovieDetail = ({ movie, onBack }) => {
  return (
    <div className="movie-detail">
      <button className="back-button" onClick={onBack}>
        Back
      </button>
      <h2>{movie.title}</h2>
      <img src={movie.mainCharacter.image} alt={movie.mainCharacter.name} />
      <h3>{movie.mainCharacter.name}</h3>
      <p>{movie.mainCharacter.description}</p>
    </div>
  );
};

export default MovieDetail;
