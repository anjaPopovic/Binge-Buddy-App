import React, { useContext } from "react";
import Header from "../../components/Header";
import { GlobalContext } from "../../context/GlobalContext";
import {
    WatchlistContainer,
    WatchlistTitle,
    NumOfContent
}
    from "../../styles/ResultsCard";
import ResultsCard from "../../components/ResultsCard";

const WatchList = () => {
    const { watchlist } = useContext(GlobalContext);

    return (
        <>
            <Header
                isAuthenticated={true}
                role="user"
            />
            <WatchlistTitle>My Watchlist</WatchlistTitle>

            <NumOfContent>
                {watchlist.length} {watchlist.length === 1 ? "TV Show/Movie" : "TV Shows/Movies"}
            </NumOfContent>

            {watchlist.length > 0 ? (
                <WatchlistContainer>
                    {watchlist.map((content) => (
                        <ResultsCard
                            key={content.id}
                            contentType={content}
                            isInList={true}
                        />
                    ))}
                </WatchlistContainer>
            ) : (
                <p>Your watchlist is empty.</p>
            )}
        </>
    );
}

export default WatchList;
