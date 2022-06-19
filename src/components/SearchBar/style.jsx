import styled from "styled-components";

export const Container = styled.div`
    width: 563px;
    height: 45px;

    display: ${props => props.isHeader ? 'flex' : 'none'};
    justify-content: space-between;
    align-items: center;

    background: #FFFFFF;
    border-radius: 8px;

    padding: 0 14px;
    margin: 0 15px;

    @media (max-width: 700px) {
        width: 90%;
        min-width: 350px;
        display: ${props => props.isHeader ? 'none' : 'flex'};
        margin-top: 82px;
    }
`;

export const Input = styled.input`
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
`;