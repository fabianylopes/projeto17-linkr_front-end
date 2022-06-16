import styled from "styled-components";

const Box = styled.div`
    width: 301px;
    height: 406px;
    padding: 10px 16px;
    background-color: #171717;
    border-radius: 16px;
`

const Title = styled.h1`
    font-family: 'Oswald', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #FFFFFF;
`

const Line = styled.div`
    width: 100%;
    height: 0px;
    border: 1px solid #484848;
`

const Hashtags = styled.div`

`

const Hashtag = styled.h2`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
`

export {
    Box,
    Title, 
    Line, 
    Hashtags,
    Hashtag
}