import styled from "styled-components";

const Hashtag = styled.span`
    font-weight: 700;
    color: #FFFFFF;

    :hover {
        color: #1877F2;
        cursor: pointer;
    }
`;

const Container = styled.div`
    max-width: 611px;
    width: 100vw;
    height: 235px;
    padding: 16px 18px;
    background-color: #171717;
    border-radius: 16px;

    display: flex;

    @media (max-width: 611px) {
        border-radius: 0px;
    }
`;

const Image = styled.div`
    margin-right: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon{
        font-size: 20px;
        color: #FFFFFF;
        font-weight: 700;
        margin-bottom: 4px;
        cursor: pointer;

    }  
    .icon-liked{
        font-size: 20px;
        color: #AC0000;
        font-weight: 700;
        margin-bottom: 4px;
        cursor: pointer;
    
    }

    img {
        width: 50px;
        height: 50px;
        margin-bottom: 20px;
        border-radius: 50%;
        object-fit: cover;
    }

    @media (max-width: 650px) {
        img {
            width: 40px;
            height: 40px;
        }
        .icon{
            font-size: 17px;

        }  
        .icon-liked{
            font-size: 17px;
        
        }
    }
`;

const Likes = styled.h4`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #FFFFFF;

    @media (max-width: 650px) {
        font-size: 9px;
    } 
`;

const Icon = styled.img`
    width: 20px;
    height: 18px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const User = styled.h1`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #FFFFFF;
    
    cursor: pointer;

    &&:hover {
        opacity: 0.8;
    }
`;

const Description = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;

    @media (max-width: 650px) {
    font-size: 17px;
    }    
`;

const Link = styled.div`
    max-width: 503px;
    width: 80vw;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;

    margin-top: 7px;

    display: flex;

    img {
        max-width: 154px;
        width: 35vw;
        height: 100%;
        object-fit: cover;

        border-radius: 0px 11px 11px 0px; 
    }

    @media (max-width: 500px) {
        width: 285px;
        height: 115px;
    }
`;

const Title = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #CECECE;
    word-break: break-all;

    @media (max-width: 500px) {
        font-size: 11px;
        line-height: 13px;
    }
`;

const Subtitle = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #9B9595;
    word-break: break-all;

    @media (max-width: 500px) {
        font-size: 9px;
        line-height: 11px;
    }
`;

const Url = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #CECECE;
    margin-bottom: 7px;
    word-break: break-all;

    @media (max-width: 500px) {
        font-size: 9px;
        line-height: 11px;
    }
`;

const Texts = styled.div`
    margin: 7px 7px 7px 11px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export { 
    Hashtag,
    Container,
    Icon,
    Likes,
    Image, 
    Content, 
    User, 
    Description, 
    Link, 
    Title, 
    Subtitle, 
    Url,
    Texts  
};