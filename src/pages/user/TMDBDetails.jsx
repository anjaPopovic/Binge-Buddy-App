import React from "react";
import { useParams } from "react-router-dom";
import Controls from "../../components/Controls";
import { useFetch } from "../../hooks/useFetch";
import {
    DetailsPage
}
    from "../../styles/ResultsCard";

const TMDBDetails = () => {
    const { id, type } = useParams();
    const tmdbUrl = `https://api.themoviedb.org/3/${type}/${id}?api_key=${import.meta.env.VITE_API_TMDB_KEY}`;

    const { data: content, loading, error } = useFetch(tmdbUrl);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !content) {
        return <div>{error ? `Error: ${error.message}` : "Content not found."}</div>;
    }

    const isMovie = type === "movie";

    return (
        <DetailsPage>
            <h1>{isMovie ? content.title : content.name}</h1>
            <p>
                <strong>{isMovie ? "Release Date" : "First Air Date"}:</strong>{" "}
                {content.release_date || content.first_air_date || "N/A"}
            </p>
            <p><strong>Overview:</strong> {content.overview || "No overview available."}</p>
            <p><strong>Rating:</strong> {content.vote_average || "N/A"}</p>
            <p>
                <strong>Genres:</strong>{" "}
                {content.genres && content.genres.length > 0
                    ? content.genres.map((genre) => genre.name).join(", ")
                    : "N/A"}
            </p>
            <p><strong>Country:</strong> {content.origin_country || "N/A"}</p>
            <p><strong>Status:</strong> {content.status || "N/A"}</p>
            {!isMovie && (
                <>
                    <p><strong>Number of episodes:</strong> {content.number_of_episodes || "N/A"}</p>
                    <p><strong>Number of seasons:</strong> {content.number_of_seasons || "N/A"}</p>
                </>
            )}

            {content.poster_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w300${content.poster_path}`}
                    alt={`${isMovie ? content.title : content.name} Poster`}
                />
            )}

            <Controls content={content} isInList={false} />
        </DetailsPage>
    );
};

export default TMDBDetails;
