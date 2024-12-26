import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Controls from "../../components/Controls";
import "../../styles/ResultsCard.css";

const Details = () => {
    const { id, type } = useParams();
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/${type}/${id}?api_key=eeb1c44fe650e74018a688a685902f5e&language=en-US`
                );
                if (response.ok) {
                    const data = await response.json();
                    setContent(data);
                } else {
                    console.error("Failed to fetch content");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [id, type]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!content) {
        return <div>Content not found.</div>;
    }

    const isMovie = type === "movie";

    return (
        <div className="details-page">
            <h1>{isMovie ? content.title : content.name}</h1>
            <p>
                <strong>{isMovie ? "Release Date" : "First Air Date"}:</strong>{" "}
                {isMovie ? content.release_date || "N/A" : content.first_air_date || "N/A"}
            </p>
            <p><strong>Overview:</strong> {content.overview || "No overview available."}</p>
            <p><strong>Rating:</strong> {content.vote_average || "N/A"}</p>
            <p>
                <strong>Genres:</strong> {content.genres && content.genres.length > 0
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

            <Controls content={content} isInList={false}/>
        
        </div>
    );
};

export default Details;
