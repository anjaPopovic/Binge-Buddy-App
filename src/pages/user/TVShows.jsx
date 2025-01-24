import React, { useState, useEffect } from "react";
import ResultsCard from "../../components/ResultsCard";
import Header from "../../components/Header";
import searchTVShows from "../../services/SearchTVShows";
import { useLocation } from "react-router-dom";
import {
  AddPage,
  InputWrapper,
  SearchButton,
  ResultsContainer
}
  from "../../styles/ResultsCard";

export const TVShows = () => {
  const [query, setQuery] = useState(() => {
    return sessionStorage.getItem("tvShowSearchQuery") || "";
  });
  const [results, setResults] = useState(() => {
    const savedResults = sessionStorage.getItem("tvShowSearchResults");
    return savedResults ? JSON.parse(savedResults) : [];
  });

  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("details")) {
      setQuery("");
      sessionStorage.removeItem("tvShowSearchQuery");
      sessionStorage.removeItem("tvShowSearchResults");
    }
  }, [location.pathname]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    sessionStorage.setItem("tvShowSearchQuery", e.target.value);
  };

  const handleSearchClick = async () => {
    fetchTVShows(query);
  };

  const fetchTVShows = async (query) => {
    if (query.trim() === "") {
      setResults([]);
      sessionStorage.setItem("tvShowSearchResults", JSON.stringify([]));
      return;
    }
    const tvShows = await searchTVShows(query);
    setResults(tvShows);
    sessionStorage.setItem("tvShowSearchResults", JSON.stringify(tvShows));
  };

  return (
    <>
      <Header isAuthenticated={true} role="user" />
      <AddPage>
        <InputWrapper>
          <input
            type="text"
            placeholder="Search for a TV Show"
            value={query}
            onChange={handleInputChange}
          />
          <SearchButton onClick={handleSearchClick}>
            Search
          </SearchButton>
        </InputWrapper>

        {results.length > 0 && (
          <ResultsContainer>
            {results.map((tv) => (
              <ResultsCard key={tv.id} contentType={tv} isInList={false} />
            ))}
          </ResultsContainer>
        )}
      </AddPage>
    </>
  );
};

export default TVShows;
