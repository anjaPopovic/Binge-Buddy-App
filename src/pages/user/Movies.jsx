import React, { useState, useEffect } from "react";
import ResultsCard from "../../components/ResultsCard";
import Header from "../../components/Header";
import searchMovies from "../../services/SearchMovies";
import {
  AddPage,
  InputWrapper,
  SearchButton,
  ResultsContainer
}
from "../../styles/ResultsCard";

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
    setMovieQuery(e.target.value);
    sessionStorage.setItem("movieSearchQuery", e.target.value);
  };

  const handleSearchClick = async () => {
    fetchMovies(movieQuery);
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
      <Header isAuthenticated={true} role="user" />
      <AddPage>
        <InputWrapper>
          <input
            type="text"
            placeholder="Search for a movie"
            value={movieQuery}
            onChange={handleInputChange}
          />
          <SearchButton onClick={handleSearchClick}>
            Search
          </SearchButton>
        </InputWrapper>

        {movieResults.length > 0 && (
          <ResultsContainer>
            {movieResults.map((movie) => (
              <ResultsCard key={movie.id} contentType={movie} isInList={false} />
            ))}
          </ResultsContainer>
        )}
      </AddPage>
    </>
  );
};

export default Movies;
