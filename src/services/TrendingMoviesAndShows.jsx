import React, { useState, useEffect } from "react";
import axios from "axios";
import ResultsCard from "../components/ResultsCard";
import "../styles/ResultsCard.css";

const TrendingContent = ({ type, title }) => {
  const [trendingContent, setTrendingContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingContent = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/${type}/day?api_key=eeb1c44fe650e74018a688a685902f5e`
        );
        
        setTrendingContent(response.data.results);
      } catch (err) {
        setError(`Failed to fetch trending ${type}`);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingContent();
  }, [type]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home-page">
      <h2>{title}</h2>
      <div className="results-container">
        {trendingContent.slice(0, 5).map((content) => (
          <ResultsCard key={content.id} contentType={content} />
        ))}
      </div>
    </div>
  );
};

const TrendingMoviesAndShows = () => {
  return (
    <div>
      <TrendingContent type="movie" title="Top 5 Trending Movies" />
      <TrendingContent type="tv" title="Top 5 Trending TV Shows" />
    </div>
  );
};

export default TrendingMoviesAndShows;
