import { useState, useEffect, useContext } from 'react';

import { Box, Title, Line, Hashtags, HashtagList } from './style';
import api from '../../services/api';

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
    const hashtag = hash.substr(1).toLowerCase();
    setHash(hashtag);
    navigate(`/hashtag/${hashtag}`)
  }

  return (
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
  )
}
