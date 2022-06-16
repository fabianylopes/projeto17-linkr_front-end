import { IoIosArrowDown } from "react-icons/io";

import Paragrafo from "../utils/Paragrafo.js";
import Imagem from "../utils/Imagem.js";
import imagemPerfil from '../../img/image-perfil.png';

import { Bar } from "./style.js";

export default function Header() {
  return (
    <Bar>
        <Paragrafo conteudo="linkr"/>
        <figure>
            <IoIosArrowDown className="icon"/>
            <Imagem imagem={imagemPerfil} alt="Foto perfil"/>
        </figure>
    </Bar>
  )
}
