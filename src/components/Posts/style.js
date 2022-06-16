import styled from "styled-components";

const Container = styled.div`

`

const Box = styled.div`
    width: 611px;
    height: 276px;
    padding: 16px 18px;
    background-color: #171717;
    border-radius: 16px;

    display: flex;
`

const Image = styled.div`
    margin-right: 18px;
`

const Content = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   
`

const User = styled.h1`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #FFFFFF;
`

const Description = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;
`

const Link = styled.div`
    width: 503px;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;

    display: flex;
`

const Title = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #CECECE;
`

const Subtitle = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #9B9595;
`

const Url = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #CECECE;
`

const Texts = styled.div`
    margin: 24px 26px 22px 18px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export { 
    Container,
    Box, 
    Image, 
    Content, 
    User, 
    Description, 
    Link, 
    Title, 
    Subtitle, 
    Url,
    Texts  
}