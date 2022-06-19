import styled from "styled-components";

const Div = styled.div`
    background-color:  #333333;
    width: 450px;
    height: 100vh;
    padding: 0px 10px 0px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    input{
        margin-top: 15px;
        width: 300px;
        height: 45px;
        border-radius: 5px;
        padding: 5px;
        background-color: #FFFFFF;
    }
    input::placeholder{
    
        font-size: 18px;
        line-height: 40px;
        color: #9F9F9F;
    }
    h1{
        
        font-size: 32px;
        line-height: 50px;
        color: #FFFFFF;
    }
    button{
        margin-top: 15px;
        width: 310px;
        height: 45px;
        border-radius: 5px;
        padding: 5px;
        background: ${props=> props.button ? '#C0C0C0': '#1877F2'};
        font-size: 20px;
        line-height: 23px;
        color: #FFFFFF;
    }
    h2{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        color: #FFFFFF;
        margin-top: 25px;
        
    }
    h2:hover{
        color: grey;
    }
    form{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    @media (max-width: 400px) {
        
        width: 100%;
        justify-content: start;
        padding: 30px 0 0 0;
        
        input{
            height: 35px;
        }
    }
    `
    const Main = styled.main`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    background-color: black;
    @media (max-width: 400px) {
        
        flex-direction: column;
        margin: 0;
    }
`

export { Div, Main }