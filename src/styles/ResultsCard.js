import styled from "styled-components";

/*for results.jsx*/
export const ResultsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    text-align: center;
    gap: 5px;
    margin-left: 12px;
    justify-content: flex-start;
    align-items: center;
`;

export const ResultsCardContainer = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: space-between; 
    transition: transform 0.2s ease-in-out;
    padding: 10px;
    margin-top: 10px;
    width: 270px;
    height: 400px; 
    max-height: 400px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    
    &:hover {
        transform: scale(1.1);
    }
    `;

export const Poster = styled.div`
    width: 100%;
    height: 220px; 
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

export const Info = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between; 
    margin-top: 8px;
    flex-grow: 1; 
`;

export const Title = styled.h3`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    word-wrap: break-word;
    max-width: 220px;
    text-align: center;
`;

/*for controls.jsx*/
export const ControlsContainer = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 

    button {
        margin-top: auto;
        padding: 10px 15px; 
        color: white;
        background: linear-gradient(135deg, #e66a5d, #ca5c50); 
        border: none;
        border-radius: 4px; 
        font-size: 16px;
        cursor: pointer;
        margin-bottom: 3px;
        transition: background 0.3s ease, transform 0.2s ease;
    }

    button:hover {
        background: linear-gradient(135deg, #dd4d3d, #FF9A9E); 
        transform: scale(1.05); 
    }
`;

/*for movies and tv shows.jsx*/
export const AddPage = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 15px;
    height: 100vh;
`;

export const InputWrapper = styled.div`
    align-self: flex-end;
    width: 300px;
    display: flex;
    gap: 5px;

    input {
        width: 100%;
        padding: 7px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
`;


export const SearchButton = styled.button`
    padding: 10px;
    background-color: #2C3E50;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
    background: linear-gradient(135deg, #2C3E50, #4CA1AF);
    transform: scale(1.05);
  }
`;


/*for watchlist and already watched pages*/
export const WatchlistTitle = styled.h1`
    text-align: left;
    margin-top: 70px;
    padding: 10px;
    margin-left: 50px;
    font-size: 28px;
`;

export const NumOfContent = styled.span`
    display: flex;
    align-self: flex-end;
    padding: 5px 15px;
    font-weight: 600;
    margin-left: 50px;
    font-size: 18px;
`;

export const WatchlistContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 5px;
    text-align: center;
    justify-content: flex-start;
    gap: 15px;
    align-items: center;
`;

/*for trending*/
export const HomePage = styled.div`
    margin-top: 20px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h2 {
        font-size: 24px;
        font-weight: bold;
        color: #333;
        margin-bottom: 15px;
    }
`;

/*for details*/
export const DetailsPage = styled.div`
    margin: 50px auto;
    padding: 25px;
    max-width: 800px;
    background-color: #f9f9f9; 
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 

    h1 {
        font-size: 32px;
        font-weight: bold;
        color: #64485C; 
        text-align: center;
        margin-bottom: 25px;
        text-wrap: wrap;
    }

    p {
        font-size: 18px;
        line-height: 1.6;
        color: #333;
        margin: 10px 0;
        text-align: justify;
    }

    strong {
        color: black; 
    }
    
    img {
        display: block;
        margin: 20px auto;
        width: 300px;
        height: auto;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    `;
