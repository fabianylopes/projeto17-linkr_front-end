import { useState, useEffect, useContext } from 'react';

import { Text, Boxes, LeftColumn, Box, Title, Line, Hashtags, HashtagList } from './style';
import { Container } from '../TelaMain/style';
import api from '../../services/api';
import Header from '../Header';
import PostBox from '../PostBox';
import Posts from '../Posts';
import HashtagContext from '../utils/context/HashtagContext';
import { useNavigate } from 'react-router-dom';

export default function Trending() {
  const navigate = useNavigate()

  const { setHash } = useContext(HashtagContext);

  const [hashtagsList, setHastagList] = useState([]);


  useEffect(() => hashtags(), []);

  function hashtags(){
    api.getHashtags().then((response) => setHastagList(response.data)).catch((error) => console.log(error));
  }

  function seeHashtag(hash){
    setHash(hash);
    navigate(`/hashtag/${hash.substr(1)}`)
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
                  <div onClick={() => seeHashtag(name)}>
                    <HashtagList key={id}>{name}</HashtagList>
                  </div>
                  );
                })}

            </Hashtags>
        </Box>
      </Boxes>
    </Container>
  )
}
