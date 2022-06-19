import { useState } from 'react';
import swal from 'sweetalert';

import api from '../utils/api/api';

import { Box, Image, Texts, Text, Inputs, SmallInput, BigInput, Button } from './style';
import imagemPerfil from '../../img/image-perfil.png';

function PostBox() {
    const dadosStorage = JSON.parse(localStorage.getItem("infoUsers"));
    const {image, token} = dadosStorage;
    
    const [dadosPost, setDadosPost] = useState({
      url: '', description: ''
    });
    const [disable, setDisable] = useState(false);
    const [sending, setSending] = useState(false);

    console.log(dadosStorage, dadosPost, image, token, disable, sending);

    function limparDados(){
      setDadosPost({
        url: '', description: ''
      });
    }

    function sucessOrError(){
      setTimeout(() => {
        setSending(false);
        setDisable(false);
        limparDados();
      }, 2000);
    }

    async function enviarDados(){
      const objConfig = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const obj = {
        url: dadosPost.url,
        description: dadosPost.description
      }

      try {
        // await api.post('/timeline', obj, objConfig);
        console.log(obj, objConfig);
        sucessOrError();
      } catch (error) {
        console.log(error);
        swal(`Houve um erro ao publicar seu link! Status: ${error.status}`);
        sucessOrError();
      }
    }

    function createPostUser(e){
      e.preventDefault();
      setDisable(true);
      setSending(true);

      const {url} = dadosPost;
      if(!url) return swal("O campo de url é obrigatório para publicar seu post");

      console.log("createPostUser");
      enviarDados();
    }

    return (
        <Box>
            <Image>
                <img src={imagemPerfil} alt="Foto perfil" />
            </Image>
            <Texts>
                <Text>What are you going to share today?</Text>
                <form onSubmit={createPostUser}>
                  <Inputs>
                      <SmallInput type="text" placeholder="http://..." required
                      value={dadosPost.url} disabled={disable}
                      onChange={(e)=>setDadosPost({...dadosPost, url: e.target.value})}/>
                      <BigInput type="text" placeholder="Awesome article about #javascript"
                      value={dadosPost.description} disabled={disable}
                      onChange={(e)=>setDadosPost({...dadosPost, description: e.target.value})}/>
                  </Inputs>
                  {
                    sending ? <Button disabled={disable}>Publishing...</Button> :
                      <Button type='submit' disabled={disable}>Publish</Button> 
                  }
                </form>
            </Texts>
        </Box>
    );
}

export default PostBox;