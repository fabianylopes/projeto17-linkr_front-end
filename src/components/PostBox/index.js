import { useContext } from "react";

import TokenContext from '../utils/context/TokenContext';
import { Box, Image, Texts, Text, Inputs, SmallInput, BigInput, Button } from './style';

export default function PostBox() {

  const { token } = useContext(TokenContext);

  return (
    <Box>
        <Image>
            <img src={token.image} alt="Foto perfil"/>
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

