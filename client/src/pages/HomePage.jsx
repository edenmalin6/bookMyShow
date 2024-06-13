import { useState, useEffect } from "react";
import dbMovies from "../data/moviesData";
import MovieDetails from "../components/MovieDetails";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const [movies, setMovies] = useState(dbMovies);
  const [showMovieDetails, setShowMovieDetails] = useState(null);
  const { Logout, user } = useAuth();
  const navigate = useNavigate();


  useEffect(()=>{
    if(user) {
      navigate("/home")
    }
  },[user])

  const handleLogout = () =>{
    Logout()
  }
  
  return (
    <div className="movies-page">
      <h1>HOT Cinema</h1>
      <button onClick={handleLogout}>Logout</button>
      {movies.map((movie) => 
        showMovieDetails !== movie.id ? (
      <div
        className="movie-container"
        key={movie.id} 
      >
        <h2>{movie.title}</h2>
        <p>{movie.description}</p>
        <p>{movie.duration}</p>
        <p>Rating: {movie.rating}</p>
        <button onClick={() => setShowMovieDetails(movie.id)}>Get Tickets</button>
      </div>
     
    ) : (
        <MovieDetails
          setMovies={setMovies}
          movie={movie}
          movies={movies}
          setShowMovieDetails={setShowMovieDetails}
        />
      )
    )}
    </div>
  );
};

export default HomePage;
