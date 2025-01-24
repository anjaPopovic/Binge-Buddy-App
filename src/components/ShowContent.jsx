import React from "react";
import { useFetch } from "../hooks/useFetch";
import ResultsCard from "./ResultsCard";
import {
    HomePage,
    ResultsContainer
} from "../styles/ResultsCard";

const ShowContent = () => {
    const { data: newContent, loading, error } = useFetch("http://localhost:5178/content");

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <HomePage>
            <h2>Users have also requested...</h2>
            <ResultsContainer>
                {newContent && newContent.length > 0 ? (
                    newContent.map((item) => (
                        <ResultsCard key={item.id} contentType={item} />
                    ))
                ) : (
                    <p>No content available</p>
                )}
            </ResultsContainer>
        </HomePage>
    );
};

export default ShowContent;
