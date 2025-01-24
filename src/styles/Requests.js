import styled from "styled-components"

/*for showing requests*/
export const RequestsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 50px;
    text-align: center;
    font-family: Arial, sans-serif;
`;

export const RequestsTable = styled.table`
    margin-bottom: 20px;
    width: 80%;
    max-width: 1000px;
    border-collapse: collapse;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;


th, td,
 {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: center;
}

th {
    background-color: #2C3E50;
    color: white;
    font-size: 1.1em;
    text-align: center;
}

td {
    font-size: 1em;
    color: #444;
    text-align: center;
}`;

export const RequestsButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 8px;
`;

export const ApproveButton = styled.button`
    background-color: darkgreen; 
    margin: 5px;
    border-radius: 5px;
    padding: 7px 10px;
    transition: background-color 0.3s;
    font-size: 0.9rem;
    cursor: pointer;
    border: none;
    color: white;

    &:hover {
        opacity: 0.9; 
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const RejectButton = styled.button`
    background-color: darkred; 
    border-radius: 5px;
    padding: 7px 10px;
    transition: background-color 0.3s;
    font-size: 0.9rem;
    cursor: pointer;
    border: none;
    color: white;

    &:hover {
        opacity: 0.9; 
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

/*for adding requests*/
export const Container = styled.div`
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh; 
    padding: 20px;
    font-family: Arial, sans-serif;
    overflow: hidden;

    h3 {
        text-align: center;
        margin-bottom: 30px; 
        font-size: 1.6em;
        color: #501B1D;
    }

    p {
        text-align: start;
        margin-bottom: 10px;
    }

    form {
        width: 100%;
        max-width: 500px; 
        background-color:  #f9f9f9;
        padding: 20px;
        margin-top: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    label {
        display: block;
        margin-bottom: 10px;
        font-size: 1.1em;
        color: #444;
    }

    input, select, textarea {
        width: 100%;
        padding: 5px 0px;
        margin-top: 5px;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 1em;
        background-color: #fff;
    }

    button {
        padding: 10px 20px;
        background: linear-gradient(135deg, #E74C3C, #dd4d3d); 
        border: none;
        border-radius: 5px;
        font-size: 1.2em;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover {
        background: linear-gradient(135deg, #dd4d3d, #FF9A9E); 
        transform: scale(1.05); 
    }

    input[type="text"]:focus,  select:focus {
        outline: none;
        border-color: #64485c;
        box-shadow: 0 0 5px rgba(100, 72, 92, 0.8);
    }

`;


export const UserRequests = styled.div`
    margin-top: 30px;
    background-color: #ddd;
    padding: 5px;
    border-radius: 5px;
`;

export const RequestList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px; 
`;

export const RequestItem = styled.div`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1.3em;
    color: #444;
`;

