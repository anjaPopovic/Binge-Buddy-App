import React, { useState } from "react";
import ResultsCard from "../../components/ResultsCard";
import Header from "../../components/Header";
import searchTVShows from "../../services/SearchTVShows";
import "../../styles/ResultsCard.css";

export const TVShows = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    fetchTVShows(e.target.value);
  };

  const fetchTVShows = async (query) => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    const tvShows = await searchTVShows(query);
    setResults(tvShows);
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
              <ResultsCard 
                key={tv.id} 
                contentType={tv} 
                isInList={false} 
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TVShows;