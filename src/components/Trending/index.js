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
    api.getHashtags().then(handleSuccess).catch((error) => console.log(error));
  }

    console.log(hashtagsList)

    function handleSuccess(response){
      const hashtags = response.data;

      setHastagList(hashtags.filter((h, i) => hashtags.indexOf(h) === i));

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
              
              {hashtagsList.map((name, i) => {
                return (
                  <div onClick={() => seeHashtag(name)}>
                    <HashtagList key={i}>{name}</HashtagList>
                  </div>
                  );
                })}

            </Hashtags>
        </Box>
      </Boxes>
    </Container>
  )
}
