import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";

const UserDetails = () => {
    const location = useLocation();
    const { id } = location.state || {}; 

    if (!id) {
        return <div>Error: User ID is missing.</div>;
    }

    const { data: userDetails, loading, error } = useFetch(`http://localhost:5175/users/${id}`);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading details: {error.message || error}</div>;
    if (!userDetails) return <div>User not found.</div>;

    const { watchlist = [], watched = [] } = userDetails; 

    return (
        <div>
            <h1>All about user_{id}:</h1>
            <p><strong>Username:</strong> {userDetails.username}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Role:</strong> {userDetails.role}</p>

            <div>
                <h2>Watchlist:</h2>
                {watchlist.length > 0 ? (
                    <ul>
                        {watchlist.map((item) => (
                            <li key={item.id} style={{"margin": "10px"}}>
                                <strong>{item.title || item.name}</strong>
                                <p>Release date: {item.release_date || item.first_air_date || "Unknown Date"}</p>
                                <p>{item.overview}</p>
                                {item.poster_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                        alt={item.title || item.name}
                                        style={{ maxWidth: "100px" }}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items in the watchlist.</p>
                )}
            </div>

            <div>
                <h2>Watched:</h2>
                {watched.length > 0 ? (
                    <ul>
                        {watched.map((item) => (
                            <li key={item.id}>
                                <strong>{item.title || item.name}</strong>
                                <p>Release date: {item.release_date || item.first_air_date || "Unknown Date"}</p>
                                <p>{item.overview}</p>
                                {item.poster_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                        alt={item.title || item.name}
                                        style={{ maxWidth: "100px" }}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items in the watched list.</p>
                )}
            </div>
        </div>
    );
};

export default UserDetails;
