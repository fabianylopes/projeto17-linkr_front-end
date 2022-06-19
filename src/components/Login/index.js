import { useState, useEffect, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../utils/api/api";
import TokenContext from "../utils/context/TokenContext";
import LeftInitial from "../utils/LeftInitial";
import { Main, Div } from "./style";

function Login(){

    const { token, setToken } = useContext(TokenContext);
    const navigate = useNavigate();
    
    const [ userInfo, setDataUserToRegister ] = useState({email:'', password:''});
    const [ buttonState, setButtonState ] = useState({activate:false, name:'Sign In'});

    useEffect(()=>{

        if(token) navigate('/timeline');
        
        const{ email, password } = userInfo; 
        if(email!== '' && password !== '' ){ 
            setButtonState({...buttonState, activate:true});
        }else setButtonState({...buttonState, activate:false});
        
    }, [userInfo]); // eslint-disable-line react-hooks/exhaustive-deps

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
                    const savedInfoUsers = JSON.stringify(res.data);
                    localStorage.setItem('infoUsers', savedInfoUsers);
                    setToken(res.data);     
                    setDataUserToRegister([res]);

                })

                .catch(error => { 
                    setButtonState({...buttonState, activate:true});
                    alert(error.response.data);  
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


export default Login;