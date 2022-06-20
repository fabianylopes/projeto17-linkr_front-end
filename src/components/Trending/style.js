import styled from "styled-components";

const Box = styled.div`
    width: 301px;
    height: 406px;
    background-color: #171717;
    border-radius: 16px;

    position: fixed;
`

const Title = styled.h1`
    font-family: 'Oswald', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #FFFFFF;
    margin:12px 16px;
`

const Line = styled.div`
    width: 100%;
    height: 0px;
    border: 1px solid #484848;
`

const Hashtags = styled.div`
    padding: 16px 16px;
`

const HashtagList = styled.h2`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
    padding-bottom: 5px;
    
    :hover {
    color: #1877f2;
    cursor: pointer;
  }
`

export {
    Box,
    Title, 
    Line, 
    Hashtags,
    HashtagList
}