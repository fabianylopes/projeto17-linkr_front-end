import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    width: 563px;
    min-height: ${props => props.isSearching ? "90px" : "45px"};

    display: ${props => props.isHeader ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: centermas;
    align-items: center;

    background-color: #E7E7E7;
    border-radius: 8px;

    margin: 0 15px;
    gap: 10px;

    @media (max-width: 700px) {
        width: 90%;
        min-width: 350px;
        display: ${props => props.isHeader ? 'none' : 'flex'};
        margin-top: 82px;
    }

    @media (min-width: 700px) {
        position: fixed;
        top: 14px;
        left: calc((100vw/2) - 281.5px);
    }

    p {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 23px;
        color: #515151;

    }

    form {
        width: 100%;
        height: 45px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        background-color: #FFFFFF;
        border-radius: 8px;

        padding: 0 14px;

        input {
            width: 100%;
            height: 100%;

            border: none;

            border-radius: 8px;
            background-color: none;

            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 19px;
            line-height: 23px;

            color: #C6C6C6;

            &&:placeholder-shown{
                font-family: 'Lato';
                font-style: normal;
                font-weight: 400;
                font-size: 19px;
                line-height: 23px;

                color: #C6C6C6;
            }
    }
    }
`;

export const UserContainer = styled(Link)`
    width: 100%;
    height: 45px;
    
    padding: 0 17px;
    gap: 12px;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    &&:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    img {
        width: 39px;
        height: 39px;

        object-fit: cover;

        border-radius: 50%;
    }

    p {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #515151;
    }

    &&:last-child {
        margin-bottom: 20px;
    }
`;