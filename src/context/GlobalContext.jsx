import React, { createContext, useReducer, useEffect } from "react";

const loadFromLocalStorage = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error(`Error loading ${key} from localStorage`, error);
        return [];
    }
};


const initialState = {
    watchlist: JSON.parse(localStorage.getItem("watchlist")) || [],
    watched: JSON.parse(localStorage.getItem("watched")) || []
};

const AppReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_WATCHLIST":
            return {
                ...state,
                watchlist: [...state.watchlist, action.payload],
            };

        case "REMOVE_FROM_WATCHLIST":
            return {
                ...state,
                watchlist: state.watchlist.filter((item) => item.id !== action.payload),
            };

        case "ADD_TO_WATCHED":
            return {
                ...state,
                watched: [...state.watched, action.payload],
                watchlist: state.watchlist.filter((item) => item.id !== action.payload.id),
            };

        case "RETURN_TO_WATCHLIST":
            return {
                ...state,
                watched: state.watched.filter((item) => item.id !== action.payload.id),
                watchlist: [...state.watchlist, action.payload],
            };

        case "REMOVE_FROM_WATCHED":
            return {
                ...state,
                watched: state.watched.filter((item) => item.id !== action.payload),
            };

        default:
            return state;
    }
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
        localStorage.setItem("watched", JSON.stringify(state.watched));
    }, [state.watchlist, state.watched]);

    const addToWatchlist = (content) => {
        dispatch({ type: "ADD_TO_WATCHLIST", payload: content });
    };

    const removeFromWatchlist = (id) => {
        dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: id });
    };

    const addToWatched = (content) => {
        dispatch({ type: "ADD_TO_WATCHED", payload: content });
    };

    const returnToWatchlist = (content) => {
        dispatch({ type: "RETURN_TO_WATCHLIST", payload: content });
    };

    const removeFromWatched = (id) => {
        dispatch({ type: "REMOVE_FROM_WATCHED", payload: id });
    };

    return (
        <GlobalContext.Provider
            value={{
                watchlist: state.watchlist,
                watched: state.watched,
                addToWatchlist,
                removeFromWatchlist,
                addToWatched,
                returnToWatchlist,
                removeFromWatched,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
