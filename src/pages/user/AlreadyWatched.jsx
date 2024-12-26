import React, { useContext } from "react";
import Header from "../../components/Header";
import { GlobalContext } from "../../context/GlobalContext";
import "../../styles/ResultsCard.css";
import ResultsCard from "../../components/ResultsCard";

const WatchList = () => {
    const { watched } = useContext(GlobalContext);

    return (
        <>
            <Header 
                isAuthenticated={true} 
                role="user" 
            />
            <h1 className="watchlist-title">Already Watched</h1>

            <span className="num-of-content">
                {watched.length} {watched.length === 1 ? "TV Show/Movie" : "TV Shows/Movies"}
            </span>

            {watched.length > 0 ? (
                <div className="watchlist-container">
                    {watched.map((content) => (
                        <ResultsCard
                            key={content.id}
                            contentType={content}
                            isInList={true}
                        />
                    ))}
                </div>
            ) : (
                <p>Your watched is empty.</p>
            )}
        </>
    );
}

export default WatchList;
