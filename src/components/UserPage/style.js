import styled from "styled-components";

export const Container = styled.section`
    width: 100%;
    min-height: 100vh;
    padding-top: 15vh;
    padding-bottom: 10vh;
    
    background-color: #333333;

    display: flex;
    justify-content: center;
    align-items: flex-start;

    gap: 25px;
`;

export const PostsContainer = styled.div`
    min-width: 611px;
    height: 100%;

    padding-top: 60px;
    gap: 16px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

export const Title = styled.div`
    width: 100%;
    height: 60px;

    display: flex;
    align-items: center;

    gap:18px;
    padding-bottom: 48px;
`;

export const Username = styled.h1`
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
`;

export const Picture = styled.img`
    width: 50px;
    height: 50px;

    object-fit: cover;
    border-radius: 50%;
`;

export const Hastags = styled.div`
    width: 301px;
    height: 406px;

    background: #171717;
    border-radius: 16px;

    margin-top: 135px;
`;