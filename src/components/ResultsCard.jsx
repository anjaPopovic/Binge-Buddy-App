import React from "react";
import {
    ResultsContainer,
    ResultsCardContainer,
    Poster,
    Info,
    Title
}
    from "../styles/ResultsCard";
import { useNavigate } from "react-router-dom";
import Controls from "./Controls";

const ResultsCard = ({ contentType, isInList }) => {
    const isMovie = contentType.hasOwnProperty("title");
    const navigate = useNavigate();

    const handleCardClick = () => {
        if (contentType?.overview) {
            navigate(`/details/${isMovie ? "movie" : "tv"}/${contentType.id}`);
        } else if (contentType?.description) {
            navigate(`/details/${contentType.id}`);
        } else {
            alert("Invalid content type");
        }
    };

    return (
        <ResultsContainer>
            <ResultsCardContainer>
                <Poster onClick={handleCardClick}>
                    {contentType?.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w200${contentType.poster_path}`}
                            alt={`${isMovie ? contentType.title : contentType.name} Poster`}
                        />
                    ) : (
                        <div>No Image</div>
                    )}
                </Poster>


                <Info>
                    <Title>
                        {isMovie ? contentType.title : contentType.name}
                    </Title>
                </Info>

                <Controls
                    content={contentType}
                    isInList={isInList}
                />
            </ResultsCardContainer>
        </ResultsContainer>
    );
};

export default ResultsCard;
