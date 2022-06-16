import { useState, useEffect } from 'react';

import imagemPerfil from '../../img/image-perfil.png';
import image from '../../img/image.png';
import { Container, Box, Image, Content, User, Description, Link, Title, Subtitle, Url, Texts } from './style';
import api from '../../services/api';

export default function Posts() {

    const [postsList, setPostList] = useState([]);

    useEffect(() => seePosts(), []);

    function seePosts(){

        api.getPosts().then((response) => setPostList(response.data)).catch((error) => console.log(error));
    }

    return (
        <Container>
            {postsList.map(({id, description, url}) => {
                return (

                    <Box key={id}>
                        <Image>
                            <img src={imagemPerfil} alt="Foto perfil"/>
                        </Image>
                        <Content>                                   
                            <User>Juvenal Juvêncio</User>
                            <Description>{description}</Description>
                            <Link>
                                <Texts>
                                    <Title>Como aplicar o Material UI em um projeto React</Title>
                                    <Subtitle>Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.</Subtitle>
                                    <Url>{url}</Url>
                                </Texts>
                                <img src={image} alt="Foto link"/>
                            </Link>

                        </Content>
                    </Box>
                );
            })}
        </Container>
  )
}


