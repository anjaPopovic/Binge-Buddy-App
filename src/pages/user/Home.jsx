import React from "react";
import Header from "../../components/Header";
import TrendingMoviesAndShows from "../../services/TrendingMoviesAndShows";
import ShowContent from "../../services/ShowContent";

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

            <div className="requested-page">
                <ShowContent />
            </div>
            
        </>
    )
}

export default Home;
