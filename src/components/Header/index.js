import { IoIosArrowDown } from "react-icons/io";

import Paragrafo from "../utils/Paragrafo.js";
import Imagem from "../utils/Imagem.js";
import imagemPerfil from '../../img/image-perfil.png';

import { Bar, Menu } from "./style.js";
import { useContext } from "react";
import TokenContext from "../utils/context/TokenContext.js";
import { useEffect } from "react/cjs/react.production.min";
import { useNavigate } from "react-router-dom";
import api from "../utils/api/api.js";

export default function Header() {

  


  return (
    <Bar>
        <Paragrafo conteudo="linkr"/>
        <figure>
            <Logout  />
            <Imagem imagem={imagemPerfil} alt="Foto perfil"/>
        </figure>
    </Bar>
  )
}

function Logout({setToken}){

  const navigate = useNavigate();

  function logout(){

    const token = localStorage.getItem('token');

    const config = {headers: {Authorization: `Bearer ${token}`}};
    
    

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