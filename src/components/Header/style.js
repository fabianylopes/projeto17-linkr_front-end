import styled from "styled-components";

const Bar = styled.div`
    width: 100%;
    height: 12vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    background-color: #151515;

    position: fixed;
    top: 0;
   
    p{
        width: 40%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Passion One;
        font-size: 45px;
        font-weight: 700;
        line-height: 50px;
        letter-spacing: 0.05em;
        text-align: left;
        color: #FFFFFF;
    }

        figure{
            width: 30%;
            height: 50px;
            display: flex;
            align-items: center;
        
            .icon{
                font-size: 24px;
                color: #FFFFFF;
                font-weight: bold;
                cursor: pointer;
               
            }
            img{
                width: 41px;
                height: 41px;
                margin-left: 14px;
                border-radius: 50%;
            }
          
   
        }
    
`

const Menu = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: space-between;


    @keyframes logout {
        0% {opacity: 0%; top:30%;}
        100% {opacity:100%; top:40%}
    }
    nav{
        position: absolute;
        left: 65%;
        display: none;
        background-color: aliceblue;
        border-radius: 5px ;
        margin-top: 20px;
        padding: 5px;
        width: 90px ;
    }
    
    &:hover nav{
        display: block;
        animation-name: logout;
        animation-duration: 0.3s;
    }
    button{
        background-color: inherit;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        color: #363636;
        cursor: pointer;


    }

`
export { Bar, Menu }