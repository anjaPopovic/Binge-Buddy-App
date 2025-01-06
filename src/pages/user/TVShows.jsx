import React, { useState, useEffect } from "react";
import ResultsCard from "../../components/ResultsCard";
import Header from "../../components/Header";
import searchTVShows from "../../services/SearchTVShows";
import { useLocation } from "react-router-dom"; // Koristi useNavigate umesto useHistory
import "../../styles/ResultsCard.css";

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
    const newQuery = e.target.value;
    setQuery(newQuery);
    sessionStorage.setItem("tvShowSearchQuery", newQuery);
    fetchTVShows(newQuery);
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
      <Header
        isAuthenticated={true}
        role="user" 
      />
      <div className="add-page">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Search for a TV Show"
            value={query}
            onChange={handleInputChange}
          />
        </div>

        {results.length > 0 && (
          <div className="results-container">
            {results.map((tv) => (
              <ResultsCard key={tv.id} contentType={tv} isInList={false} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TVShows;
