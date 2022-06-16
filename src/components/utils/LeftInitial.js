import styled from "styled-components";


function LeftInitial(){

    return(

        <MainLeft>
            <p>Linkr</p>
            <h1>save, share and discover
            the best links on the web</h1>
        </MainLeft>

    );

}

const MainLeft = styled.div`

    display:flex;
    height: 100vh;
    width: 50%; 
    

    flex-direction: column;
    justify-content: center;
    font-family: oswald;
    font-weight: 700;
    font-style: normal;
    color: #FFFFFF;
    margin-left:16.28%;
    margin-right: 50px;
    
    p{
        font-family: 'Passion One';
       
        font-size: 106px;
        

    /* identical to box height */
    letter-spacing: 0.05em;

    }

    h1{
        font-family: 'Oswald';
        font-size: 43px;
        line-height: 64px;
    }

    @media (max-width: 400px) {
        
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        text-align: center;
        margin: 0;
        padding-bottom: 15px;
        p{
            font-size: 76px;
            margin-top: 30px;
        }
        h1{
            font-size: 25px;
            line-height: 30px;
            width: 75%;

            
        }
    }

`

export default LeftInitial;