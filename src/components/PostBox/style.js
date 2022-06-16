import styled from "styled-components";

const Box = styled.div`
    width: 611px;
    height: 209px;
    padding: 16px 18px;
    background-color: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;

    display: flex;
`

const Image = styled.div`
    margin-right: 18px;
`

const Texts = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;
`

const Text = styled.h1`
    width: 445px;
    height: 40px;
    font-family: 'Lato';
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
`

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
`

const SmallInput = styled.input`
    width: 503px;
    height: 30px;
    padding: 12px;
    margin-bottom: 5px;
    background-color: #EFEFEF;
    border-radius: 5px;
    outline: 0;
    border: none;

    ::placeholder{
        font-family: 'Lato';
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        color: #949494;
    }
`

const BigInput = styled.input`
    width: 503px;
    height: 66px;
    padding: 12px;
    margin-bottom: 5px;
    background-color: #EFEFEF;
    border-radius: 5px;
    outline: 0;
    border: none;

    ::placeholder{
        font-family: 'Lato';
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        color: #949494;
    }
`

const Button = styled.button`
    width: 112px;
    height: 31px;
    background-color: #1877F2;
    border-radius: 5px;
    cursor: pointer;

    font-family: 'Lato';
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
`

export {
    Box,
    Image,
    Texts,
    Text,
    Inputs,
    SmallInput,
    BigInput,
    Button
}