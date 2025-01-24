import React, { useContext } from "react";
import Header from "../../components/Header";
import { GlobalContext } from "../../context/GlobalContext";
import {
    WatchlistTitle,
    NumOfContent,
    WatchlistContainer  
}
from "../../styles/ResultsCard";
import ResultsCard from "../../components/ResultsCard";

const WatchList = () => {
    const { watched } = useContext(GlobalContext);

    return (
        <>
            <Header 
                isAuthenticated={true} 
                role="user" 
            />
            <WatchlistTitle>Already Watched</WatchlistTitle>

            <NumOfContent>
                {watched.length} {watched.length === 1 ? "TV Show/Movie" : "TV Shows/Movies"}
            </NumOfContent>

            {watched.length > 0 ? (
                <WatchlistContainer>
                    {watched.map((content) => (
                        <ResultsCard
                            key={content.id}
                            contentType={content}
                            isInList={true}
                        />
                    ))}
                </WatchlistContainer>
            ) : (
                <p>Your watched is empty.</p>
            )}
        </>
    );
}

export default WatchList;
