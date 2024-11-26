import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [auth, setAuth] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get("/api/movies");
      setMovies(response.data);
    };
    
    fetchMovies();

    const token = localStorage.getItem("authToken");
    if (token) {
      setAuth(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    history.push("/login"); // Redirigir a la página de login
  };

  const handleLike = (movieId) => {
    if (!auth) {
      alert("You need to login to like a movie.");
      return;
    }
    axios.post(`/api/movies/like/${movieId}`);
  };

  const handleComment = (movieId, comment) => {
    if (!auth) {
      alert("You need to login to comment.");
      return;
    }
    axios.post(`/api/movies/comment/${movieId}`, { comment });
  };

  return (
    <div>
      <h2>Movies</h2>
      {auth && <button onClick={handleLogout}>Logout</button>}
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            {auth && (
              <div>
                <button onClick={() => handleLike(movie._id)}>Like</button>
                <button onClick={() => handleComment(movie._id, "Great movie!")}>Comment</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
