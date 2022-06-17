import { IoIosArrowDown } from "react-icons/io";

import Paragrafo from "../utils/Paragrafo.js";
import Imagem from "../utils/Imagem.js";
import imagemPerfil from '../../img/image-perfil.png';

import { Bar, Menu } from "./style.js";
import { useContext } from "react";
import TokenContext from "../utils/context/TokenContext.js";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api/api.js";

export default function Header() {

  const navigate = useNavigate();

  const { token, setToken } = useContext(TokenContext);
  
  useEffect(()=> {if(!token) navigate('/')} , [token]);

  return (
    <Bar>
        <Paragrafo conteudo="linkr"/>
        <figure>
            <Logout setToken={setToken} />
            <Imagem imagem={token ? token.image: imagemPerfil} alt="Foto perfil"/>
        </figure>
    </Bar>
  )
}

function Logout({setToken}){

  function logout(){

    const { token } = JSON.parse(localStorage.getItem('infoUsers'))

    api.put('/logout', {token})
      .then(res =>{
        localStorage.removeItem('infoUsers');
        setToken(null);
      })
      .catch(erro => {
        console.log('erro ao fazer o logout', erro);
      
      })
  }

  return(
    <>
      <Menu className="menu" >

        <IoIosArrowDown className="icon"/>

        <nav className="nav">
          <button onClick={()=>logout()}>logout</button>
        </nav>

      </Menu>
    </>
 
  )
}
