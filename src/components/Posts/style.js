import styled from "styled-components";

const Hashtag = styled.div`
    font-weight: 700;
    color: #FFFFFF;

  :hover {
    color: #1877F2;
    cursor: pointer;
  }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
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
        cursor: pointer;
    }
`

const Likes = styled.h4`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #FFFFFF;
`

const Icon = styled.img`
    width: 20px;
    height: 18px;
`

const Content = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;

    .userPost{
        width: 100%;
    }
   
`

const User = styled.h1`
    width: 100%;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    position: relative;

    cursor: pointer;

    &&:hover {
        opacity: 0.8;
    }

    .icon{
        position: absolute;
        font-size: 24px;
    }

    .lixeira{
        right: 0;
        top: 0;
    }
    .editar{
        right: 24px;
        top: 0;
    }
`

const Description = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;
`

const Link = styled.a`
    width: 503px;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;

    display: flex;

    img{
        width: 154px;
        height: 100%;
        object-fit: cover;
    }

    :hover {
        cursor: pointer;
  }
`

const Texts = styled.div`
    margin: 24px 26px 22px 18px;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

const Url = styled.h4`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #CECECE;
`

export { 
    Hashtag,
    Container,
    Box, 
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
}