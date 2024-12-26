import React from "react";
import Header from "../../components/Header";
import TrendingMoviesAndShows from "../../services/TrendingMoviesAndShows";
const Home = () => {
    return (
        <>
            <Header
                isAuthenticated={true} 
                role="user" 
            />
            <div className="home-page">
                <TrendingMoviesAndShows />
            </div>
        </>
    )
}

export default Home;
