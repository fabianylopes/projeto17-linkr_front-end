import { useState, useEffect } from 'react';

import { Text, Boxes, LeftColumn, Box, Title, Line, Hashtags, HashtagList } from './style';
import { Container } from '../TelaMain/style';
import api from '../../services/api';
import Header from '../Header';
import PostBox from '../PostBox';
import Posts from '../Posts';

export default function Hashtag() {

  const [hashtagsList, setHastagList] = useState([]);

  useEffect(() => hashtags(), []);

  function hashtags(){
    api.getHashtags().then((response) => setHastagList(response.data)).catch((error) => console.log(error));
  }

  return (
    <Container>
      <Header/>
        <Text>timeline</Text>
      <Boxes>
        <LeftColumn>
          <PostBox/>
          <Posts/>
        </LeftColumn>
        <Box>
            <Title>trending</Title>
            <Line></Line>
            <Hashtags>
              
              {hashtagsList.map(({name, id}) => {
                return (
                  <HashtagList key={id}>{name}</HashtagList>
                  );
                })}

            </Hashtags>
        </Box>
      </Boxes>
    </Container>
  )
}
