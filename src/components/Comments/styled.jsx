import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    
    background: #1E1E1E;
    border-radius: 0 0 16px 16px;

    padding: 30px 23px 25px 23px;
    gap: 20px;
    
    position: relative;
    top: -16px;
`;

export const WriteComment = styled.div`
    width: 100%;

    display: flex;
    justify-content: space-between;

    margin-top: 19px;


    img {
        width: 39px;
        height: 39px;

        border-radius: 50%;
        object-fit: cover;
    }

    form {
        width: 510px;
        height: 39px;

        background-color: #252525;
        border-radius: 8px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 0 15px;

        button {
            background-color: #252525;
            border:none;
        }

        input {
            width: 90%;
            
            background-color: #252525;
            border: none;

            font-family: 'Lato';
            font-style: italic;
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            letter-spacing: 0.05em;
            color: #575757;

            &&:placeholder {
                font-family: 'Lato';
                font-style: italic;
                font-weight: 400;
                font-size: 14px;
                line-height: 17px;
                letter-spacing: 0.05em;
                color: #575757;
            }

        }
    }
`;

export const CommentContainer = styled.section`
    width: 100%;
    height: 71px;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    gap: 18px;

    border-bottom: 1px solid #353535;


    img {
        width: 39px;
        height: 39px;

        border-radius: 50%;
        object-fit: cover;
    }

    section {
        display: flex;
        flex-direction: column;

        gap: 5px;

        h1{
            font-family: 'Lato';
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            line-height: 17px;
            color: #F3F3F3;
            cursor: pointer;

            &&:hover {
                opacity: 0.8;
            }

            em {
                font-family: 'Lato';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 17px;
                color: #565656;
                margin-left: 5px;
            }
        }

        p {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            color: #ACACAC;
        }

    }
`;