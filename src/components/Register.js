import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
import api from "./utils/api/api";
import TokenContext from "./utils/context/TokenContext";
import LeftInitial from "./utils/LeftInitial";

function Register(){

    const { token } = useContext(TokenContext);
    const [userInfo, setDataUserToRegister] = useState({email:'', username:'', password:'', picture_url:''});
    const [buttonState, setButtonState] = useState({activate:false, name:'Sign Up'});
    const navigate = useNavigate();

    useEffect(()=>{
        
        if(token) navigate('/timeline');

        const{ email, username, password, picture_url } = userInfo;  
        
        if(email!== '' && password !== '' && username !== '' && picture_url !== ''){ 
            setButtonState({...buttonState, activate:true});
        }else setButtonState({...buttonState, activate:false});
        
    }, [userInfo]);

    function tryCadastrar(event){
        
        event.preventDefault();

        setButtonState({...buttonState, activate:false})

        api.post('/sign-up', userInfo)
            .then(response => { navigate('/')})
            .catch(error => { 
                setButtonState({...buttonState, activate:true})
                alert(error.response.data)
                
            });
    }

    return(

        <>
        <Main>
            <LeftInitial/>

            <Div button={!buttonState.activate}>
                    
                <form onSubmit={tryCadastrar}>
                    <input required type={"email"} placeholder="e-mail" onChange={(e)=>{setDataUserToRegister({...userInfo, email:e.target.value})}}></input>
                    <input required type={"password"} placeholder="password" onChange={(e)=>{setDataUserToRegister({...userInfo, password:e.target.value})}}></input>
                    <input required type={"text"} placeholder="username" onChange={(e)=>{setDataUserToRegister({...userInfo, username:e.target.value})}}></input>
                    <input required type={"url"} placeholder="picture url" onChange={(e)=>{setDataUserToRegister({...userInfo, picture_url:e.target.value})}}></input>
                    <button disabled={!buttonState.activate}>{buttonState.name}</button>

                </form>

                <Link to={"/"}>
                    <h2>Switch back to log in</h2>
                </Link>
            </Div>
        </Main>
        </>

    )


}

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


export default Register;