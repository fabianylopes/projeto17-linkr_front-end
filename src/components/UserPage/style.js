import styled from "styled-components";

export const Container = styled.section`
    width: 100%;
    min-height: 100vh;
    padding: 15vh 10px 10vh 10px;
    
    background-color: #333333;

    display: flex;
    justify-content: center;
    align-items: flex-start;

    gap: 2vw;

    @media (max-width: 650px) {
        min-width: 375px;
    }
`;

export const PostsContainer = styled.div`
    max-width: 611px;
    width: 100vw;
    height: 100%;

    padding-top: 60px;
    gap: 16px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    @media (max-width: 650px) {
        width: 611px;
        min-width: 375px;
    }
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

    @media (max-width: 650px) {
        font-size: 33px;
    }
`;

export const Picture = styled.img`
    width: 50px;
    height: 50px;

    object-fit: cover;
    border-radius: 50%;

    @media (max-width: 650px) {
        width: 40px;
        height: 40px;

    }
`;

export const Hastags = styled.div`
    width: 301px;
    min-width: 275px;
    height: 406px;

    background: #171717;
    border-radius: 16px;

    margin-top: 135px;

    @media (max-width: 940px){
        display: none;
        
    }
`;

export const Text = styled.h1`
    width: 100%;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 64px;
    color: #FFFFFF;
    text-align: center;
`;