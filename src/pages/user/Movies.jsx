import React, { useState, useEffect } from "react";
import ResultsCard from "../../components/ResultsCard";
import Header from "../../components/Header";
import searchMovies from "../../services/SearchMovies";
import "../../styles/ResultsCard.css";

const Movies = () => {
  const [movieQuery, setMovieQuery] = useState(() => {
    return sessionStorage.getItem("movieSearchQuery") || "";
  });
  const [movieResults, setMovieResults] = useState(() => {
    const savedResults = sessionStorage.getItem("movieSearchResults");
    return savedResults ? JSON.parse(savedResults) : [];
  });

  useEffect(() => {
    if (!location.pathname.includes("details")) {
      setMovieQuery("");
      sessionStorage.removeItem("movieSearchQuery");
      sessionStorage.removeItem("movieSearchResults");
    }
  }, [location.pathname]);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setMovieQuery(newQuery);
    sessionStorage.setItem("movieSearchQuery", newQuery);
    fetchMovies(newQuery);
  };

  const fetchMovies = async (query) => {
    if (query.trim() === "") {
      setMovieResults([]);
      sessionStorage.setItem("movieSearchResults", JSON.stringify([]));
      return;
    }
    const movies = await searchMovies(query);
    setMovieResults(movies);
    sessionStorage.setItem("movieSearchResults", JSON.stringify(movies));
  };

  return (
    <>
      <Header
        isAuthenticated={true}
        role="user"
      />
      <div className="add-page">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Search for a movie"
            value={movieQuery}
            onChange={handleInputChange}
          />
        </div>

        {movieResults.length > 0 && (
          <div className="results-container">
            {movieResults.map((movie) => (
              <ResultsCard key={movie.id} contentType={movie} isInList={false} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Movies;
