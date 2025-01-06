import React, { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";

const initialState = {
    watchlist: [],
    watched: [],
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

        case "SET_USER_DATA":
            return {
                ...state,
                watchlist: action.payload.watchlist,
                watched: action.payload.watched,
            };

        default:
            return state;
    }
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("id"); 
        if (userId) {
            fetchUserData(userId);
        }
    }, []);

    const fetchUserData = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5175/users/${userId}`);
            setCurrentUser(response.data);
            dispatch({
                type: "SET_USER_DATA",
                payload: {
                    watchlist: response.data.watchlist,
                    watched: response.data.watched,
                },
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const addToWatchlist = (content) => {
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                watchlist: [...currentUser.watchlist, content],
            };
            updateUserData(updatedUser);
            dispatch({ type: "ADD_TO_WATCHLIST", payload: content });
        }
    };

    const removeFromWatchlist = (id) => {
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                watchlist: currentUser.watchlist.filter((item) => item.id !== id),
            };
            updateUserData(updatedUser);
            dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: id });
        }
    };

    const addToWatched = (content) => {
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                watched: [...currentUser.watched, content],
                watchlist: currentUser.watchlist.filter((item) => item.id !== content.id),
            };
            updateUserData(updatedUser);
            dispatch({ type: "ADD_TO_WATCHED", payload: content });
        }
    };

    const removeFromWatched = (id) => {
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                watched: currentUser.watched.filter((item) => item.id !== id),
            };
            updateUserData(updatedUser);
            dispatch({ type: "REMOVE_FROM_WATCHED", payload: id });
        }
    };
    const returnToWatchlist = (content) => {
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                watchlist: [...currentUser.watchlist, content],
                watched: currentUser.watched.filter((item) => item.id !== content.id),
            };
            updateUserData(updatedUser);
            dispatch({ type: "RETURN_TO_WATCHLIST", payload: content });
        }
    };
    

    const updateUserData = async (updatedUser) => {
        try {
            await axios.put(`http://localhost:5175/users/${currentUser.id}`, updatedUser);
            setCurrentUser(updatedUser);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    return (
        <GlobalContext.Provider
            value={{
                watchlist: state.watchlist,
                watched: state.watched,
                addToWatchlist,
                removeFromWatchlist,
                addToWatched,
                removeFromWatched,
                returnToWatchlist
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
