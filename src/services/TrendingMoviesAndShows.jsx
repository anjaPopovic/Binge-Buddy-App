import React from "react";
import ResultsCard from "../components/ResultsCard";
import "../styles/ResultsCard.css";
import { useFetch } from "../hooks/useFetch";

const TrendingContent = ({ type, title }) => {
  const { data: trendingContent, loading, error } = useFetch(`https://api.themoviedb.org/3/trending/${type}/day?api_key=${import.meta.env.VITE_API_TMDB_KEY}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-page">
      <h2 style={{ "marginLeft": "50px" }}>{title}</h2>
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
