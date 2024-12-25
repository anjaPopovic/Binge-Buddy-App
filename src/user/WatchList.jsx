import React, { useContext } from "react";
import Header from "../../components/Header";
import { GlobalContext } from "../../context/GlobalContext";
import "../../styles/ResultsCard.css";
import ResultsCard from "../../components/ResultsCard";

const WatchList = () => {
    const { watchlist } = useContext(GlobalContext);

    return (
        <>
            <Header 
                isAuthenticated={true} 
                role="user" 
            />
            <h1 className="watchlist-title">My Watchlist</h1>

            <span className="num-of-content">
                {watchlist.length} {watchlist.length === 1 ? "TV Show/Movie" : "TV Shows/Movies"}
            </span>

            {watchlist.length > 0 ? (
                <div className="watchlist-container">
                    {watchlist.map((content) => (
                        <ResultsCard
                            key={content.id}
                            contentType={content}
                            isInList={true}
                        />
                    ))}
                </div>
            ) : (
                <p>Your watchlist is empty.</p>
            )}
        </>
    );
}

export default WatchList;
