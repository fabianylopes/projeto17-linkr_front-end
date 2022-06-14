import { IoIosArrowDown } from "react-icons/io";

import Paragrafo from "../utils/Paragrafo.js";
import Imagem from "../utils/Imagem.js";

import { Container } from "./style.js";
import imagemPerfil from '../../img/image-perfil.png';

function Timeline() {
    return (  
        <Container>
            <header>
                <Paragrafo conteudo="linkr"/>
                <figure>
                    <IoIosArrowDown className="icon"/>
                    <Imagem imagem={imagemPerfil} alt="Foto perfil"/>
                </figure>
            </header>
        </Container>
    );
}

export default Timeline;