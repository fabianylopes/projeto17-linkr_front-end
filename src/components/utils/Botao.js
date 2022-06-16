function Botao(props) {
    const {classe, conteudo, click, tipo, disabled} = props;

    return ( 
        <button className={classe} type={tipo} onClick={click} disabled={disabled}>{conteudo}</button>
    );
}

export default Botao;