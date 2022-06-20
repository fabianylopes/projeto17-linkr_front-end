import styled from "styled-components";

export const Title = styled.h1`
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
    margin-bottom: 40px;
`

export const Text = styled.h2`
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    text-align: center;
    color: #FFFFFF;
`

export const Container = styled.section`
    width: 100%;
    min-height: 100vh;
    padding-top: 15vh;
    padding-bottom: 10vh;
    
    background-color: #333333; 

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;

    @media (max-width: 700px){
        padding-top: 0;
    }

`

export const Body = styled.div`
    display: flex;
    flex-direction: column;
`

export const Boxes = styled.div`
    display: flex;
    gap: 24px;
`

export const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`