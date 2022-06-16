import imagemPerfil from '../../img/image-perfil.png';
import image from '../../img/image.png';

import { Box, Image, Content, User, Description, Link, Title, Subtitle, Url, Texts } from './style';

export default function Posts() {
  return (
    <Box>
        <Image>
            <img src={imagemPerfil} alt="Foto perfil"/>
        </Image>
        <Content>
            <User>Juvenal Juvêncio</User>
            <Description>Muito maneiro esse tutorial de Material UI com React, deem uma olhada!</Description>
            <Link>
                <Texts>
                    <Title>Como aplicar o Material UI em um projeto React</Title>
                    <Subtitle>Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.</Subtitle>
                    <Url>https://medium.com/@pshrmn/a-simple-react-router</Url>
                </Texts>
                <img src={image} alt="Foto usuário"/>
            </Link>
        </Content>
    </Box>
  )
}


