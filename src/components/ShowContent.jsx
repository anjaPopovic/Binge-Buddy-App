import React from "react";
import { useFetch } from "../hooks/useFetch";
import ResultsCard from "../components/ResultsCard";

const ShowContent = () => {
    const { data: newContent, loading, error } = useFetch("http://localhost:5178/content");

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Users have also requested...</h2>
            <div>
                {newContent && newContent.length > 0 ? (
                    newContent.map((item) => (
                        <ResultsCard key={item.id} contentType={item} />
                    ))
                ) : (
                    <p>No content available</p>
                )}
            </div>
        </div>
    );
};

export default ShowContent;
