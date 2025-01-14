import React from "react";
import { useParams } from "react-router-dom";
import Controls from "../../components/Controls";
import "../../styles/ResultsCard.css";
import { useFetch } from "../../hooks/useFetch";

const LocalDetails = () => {
    const { id } = useParams();
    const localUrl = `http://localhost:5178/content/${id}`;

    const { data: content, loading, error } = useFetch(localUrl);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !content) {
        return <div>{error ? `Error: ${error.message}` : "Content not found."}</div>;
    }

    return (
        <div className="details-page">
            <h1>{content.title}</h1>
            <p><strong>Release Date:</strong> {content.releaseDate || "N/A"}</p>
            <p><strong>Description:</strong> {content.description || "No description available."}</p>
            <p><strong>Genre:</strong> {content.genre || "N/A"}</p>
            <p><strong>Country:</strong> {content.country || "N/A"}</p>
            {content.seasons && <p><strong>Seasons:</strong> {content.seasons}</p>}
            {content.episodes && <p><strong>Episodes:</strong> {content.episodes}</p>}
            <Controls content={content} isInList={false} />
        </div>
    );
};

export default LocalDetails;
