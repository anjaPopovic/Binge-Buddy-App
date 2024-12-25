import React, { useContext } from "react";
import "../styles/ResultsCard.css";
import { useNavigate } from "react-router-dom";
import Controls from "./Controls";

const ResultsCard = ({ contentType, isInList }) => {
    const isMovie = contentType.hasOwnProperty("title");
    const navigate = useNavigate();

    const handleCardClick = () => {
        if (contentType?.id) {
            navigate(`/details/${isMovie ? "movie" : "tv"}/${contentType.id}`);
        } else {
            alert("Invalid content type");
        }
    };

    return (
        <div className="results-container">
            <div className="results-card">
                <div className="poster" onClick={handleCardClick}>
                    {contentType.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w200${contentType.poster_path}`}
                            alt={`${isMovie ? contentType.title : contentType.name} Poster`}
                        />
                    ) : (
                        <div className="filler" />
                    )}
                </div>

                <div className="info">
                    <h3 className="title">
                        {isMovie ? contentType.title : contentType.name}
                    </h3>
                </div>

                <Controls
                    content={contentType}
                    isInList={isInList}
                />
            </div>
        </div>
    );
};

export default ResultsCard;
