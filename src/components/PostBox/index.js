import { useState } from 'react';
import swal from 'sweetalert';

import api from '../utils/api/api';
import { Box, Image, Texts, Text, Inputs, SmallInput, BigInput, ButtonBox, Button } from './style';

function PostBox(props) {
    // const { reload } = props;
    let image = '';
    let token = '';
    const dadosStorage = JSON.parse(localStorage.getItem("infoUsers"));
    dadosStorage ?  { image, token } = dadosStorage: image = '';
    
    const [dadosPost, setDadosPost] = useState({
      url: '', description: ''
    });
    const [disable, setDisable] = useState(false);
    const [sending, setSending] = useState(false);

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
      }, 1500);
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
        await api.post('/timeline', obj, objConfig);
        sucessOrError();
        // reload((await api.get('/timeline')).data.posts);
        swal("Post inserido com sucesso");
        setTimeout(()=>{
          window.location.reload();
        }, 1200);
      } catch (error) {
        swal(`Houve um erro ao publicar seu link! Status: ${error.response.status}`);
        sucessOrError();
      }
    }

    function createPostUser(e){
      e.preventDefault();
      setDisable(true);
      setSending(true);

      const {url} = dadosPost;
      if(!url) return swal("O campo de url é obrigatório para publicar seu post");
      if(!token) return swal("Você precisa estar logado para publicar seu post");

      enviarDados();
    }

    return (
        <Box>
            <Image>
                <img src={image} alt="Foto perfil"/>
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
                  <ButtonBox>
                    {
                      sending ? <Button disabled={disable}>Publishing...</Button> :
                      <Button type='submit' disabled={disable}>Publish</Button> 
                    }
                    </ButtonBox>
                </form>
            </Texts>
        </Box>
    );
}

export default PostBox;