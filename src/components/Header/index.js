import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IconContext } from "react-icons";

import Paragrafo from "../utils/Paragrafo.js";
import Imagem from "../utils/Imagem.js";
import imagemPerfil from '../../img/image-perfil.png';

import { Bar, Menu } from "./style.js";
import { useContext } from "react";
import TokenContext from "../utils/context/TokenContext.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api/api.js";

export default function Header() {

  const navigate = useNavigate();

  const { token, setToken } = useContext(TokenContext);

  useEffect(()=> {if(!token) navigate('/')} , [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Bar>
        <Paragrafo conteudo="linkr"  click={() => navigate("/timeline")} />
        <figure>
            <Logout setToken={setToken} token={token}/>
        </figure>
    </Bar>
  )
}

function Logout({setToken, token}){

  const [down, setPosition] = useState(true);

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
      <Menu className="menu" onMouseEnter={() => setPosition(false)} onMouseLeave={() => setPosition(true)}  >
        <div>
          <Icon name={down ? IoIosArrowDown : IoIosArrowUp}  />
          <Imagem imagem={token ? token.image: imagemPerfil} alt="Foto perfil"/>
        </div>
        
        <nav className="nav">
          <button onClick={()=>logout()}>logout</button>
        </nav>

      </Menu>
    </>
 
  )
}

function Icon ({ name }){

  const IconCompenent = name;
  
  return(
      
      <IconContext.Provider value={{}}>
          <IconCompenent className="icon" />
      </IconContext.Provider>
      
  );
}
