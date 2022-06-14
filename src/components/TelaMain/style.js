import styled from "styled-components";

export const Container = styled.section`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #333333;

    header{
        width: 100%;
        height: 12vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        background-color: #151515;
        
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
            justify-content: space-evenly;
            align-items: center;

            .icon{
                font-size: 24px;
                color: #FFFFFF;
                font-weight: bold;
            }
            img{
                width: 41px;
                height: 41px;
                border-radius: 50%;
            }
        }
    }
`;