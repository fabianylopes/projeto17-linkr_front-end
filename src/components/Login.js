import { useState, useEffect, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "./utils/api/api";
import TokenContext from "./utils/context/TokenContext";
import LeftInitial from "./utils/LeftInitial";

function Login(){

    const { token, setToken } = useContext(TokenContext);
    const navigate = useNavigate();
    
    const [ userInfo, setDataUserToRegister ] = useState({email:'', password:''});
    const [ buttonState, setButtonState ] = useState({activate:false, name:'Sign In'});

    useEffect(()=>{

        if(token) navigate('/timeline') 

        const{ email, password } = userInfo;  
        if(email!== '' && password !== '' ){ 
            setButtonState({...buttonState, activate:true});
        }else setButtonState({...buttonState, activate:false});
        
    }, [userInfo]);

    function tryLogin(event){
        
        event.preventDefault();

        //validação extra de segurança, pois os campos estão como required
        //entretanto alguns usuários consegue desativar o required direto no html
        if(userInfo.email === '' || userInfo.password === ''){
            alert('preencha os dois campos');
        }
        else{
            setButtonState({...buttonState, activate:false})

            api.post('/sign-in', userInfo)
                .then(res => {

                    localStorage.setItem('token', `${res.data}`)
                    setToken(`${res.data}`)                   
                    navigate('/timeline')})

                .catch(error => { 
                    setButtonState({...buttonState, activate:true})
                    alert(error.response.data)  
            });
        } 
    }

    return(
        <>
        <Main>
            <LeftInitial />

            <Div button={!buttonState.activate}>
                    
                <form onSubmit={tryLogin}>
                    <input required type={"email"} placeholder="e-mail" onChange={(e)=>{setDataUserToRegister({...userInfo, email:e.target.value})}}></input>
                    <input required type={"password"} placeholder="password" onChange={(e)=>{setDataUserToRegister({...userInfo, password:e.target.value})}}></input>
                    <button disabled={!buttonState.activate}>{buttonState.name}</button>

                </form>

                <Link to={"/sign-up"}>
                    <h2>First time? Create an account!</h2>
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
export default Login;