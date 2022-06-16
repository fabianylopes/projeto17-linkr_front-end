import imagemPerfil from '../../img/image-perfil.png';

import { Box, Image, Texts, Text, Inputs, SmallInput, BigInput, Button } from './style';

export default function PostBox() {
  return (
    <Box>
        <Image>
            <img src={imagemPerfil} alt="Foto perfil"/>
        </Image>
        <Texts>
            <Text>What are you going to share today?</Text>
            <Inputs>
                <SmallInput placeholder='http://...'></SmallInput>
                <BigInput placeholder='Awesome article about #javascript'></BigInput>
            </Inputs>
            <Button>Publish</Button>
        </Texts>
    </Box>
  )
}

