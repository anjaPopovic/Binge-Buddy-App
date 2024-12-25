import React, { useState } from "react";
import ResultsCard from "../../components/ResultsCard";
import Header from "../../components/Header";
import searchMovies from "../../services/SearchMovies";
import "../../styles/ResultsCard.css";

const Movies = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    fetchMovies(e.target.value);
  };

  const fetchMovies = async (query) => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    const movies = await searchMovies(query);
    setResults(movies);
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
            value={query}
            onChange={handleInputChange}
          />
        </div>

        {results.length > 0 && (
          <div className="results-container">
            {results.map((movie) => (
              <ResultsCard
                key={movie.id} 
                contentType={movie} 
                isInList={false} 
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Movies;
