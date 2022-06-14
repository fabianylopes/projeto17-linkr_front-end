function Imagem(props) {
    const {classe, click, imagem, alt} = props;
    
    return ( <img src={imagem} className={classe} onClick={click} alt={alt}/> );
}

export default Imagem;