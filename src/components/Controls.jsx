import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import {
    ControlsContainer
} from "../styles/ResultsCard";

const Controls = ({ content, isInList }) => {
    const {
        addToWatchlist,
        removeFromWatchlist,
        addToWatched,
        removeFromWatched,
        returnToWatchlist,
        watchlist,
        watched
    } = useContext(GlobalContext);

    const alreadyInWatchlist = watchlist.some((item) => item.id === content.id);
    const alreadyInWatched = watched.some((item) => item.id === content.id);

    if (!isInList) {
        return (
            <ControlsContainer>
                {alreadyInWatchlist || alreadyInWatched ? (
                    <>
                        {alreadyInWatchlist && <button disabled>Already in Watchlist</button>}
                        {alreadyInWatched && <button disabled>Already in Watched</button>}
                    </>
                ) : (
                    <>
                        <button onClick={() => addToWatchlist(content)}>
                            Add to Watchlist
                        </button>
                        <button onClick={() => addToWatched(content)}>
                            Add to Watched
                        </button>
                    </>
                )}
            </ControlsContainer>
        );
    }

    return (
        <ControlsContainer>
            {alreadyInWatchlist && !alreadyInWatched && (
                <>
                    <button onClick={() => removeFromWatchlist(content.id)}>
                        Remove from Watchlist
                    </button>
                    <button onClick={() => addToWatched(content)}>
                        Add to Watched
                    </button>
                </>
            )}

            {alreadyInWatched && (
                <>
                    <button onClick={() => removeFromWatched(content.id)}>
                        Remove from Watched
                    </button>
                    <button onClick={() => returnToWatchlist(content)}>
                        Return to Watchlist
                    </button>
                </>
            )}
        </ControlsContainer>
    );
};

export default Controls;
