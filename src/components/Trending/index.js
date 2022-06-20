import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Title, Line, Hashtags, HashtagList } from './style';
import HashtagContext from '../utils/context/HashtagContext';
import api from '../../services/api';

export default function Trending() {
  const navigate = useNavigate()

  const { setHash } = useContext(HashtagContext);

  const [hashtagsList, setHastagList] = useState([]);

  useEffect(() => hashtags(), []);

  function hashtags(){
    api.getHashtags().then((response) => setHastagList(response.data)).catch((error) => console.log(error));
  }

  function seeHashtag(hash){
    setHash(hash.substr(1));
    navigate(`/hashtag/${hash.substr(1)}`)
  }

  return (
    <div>
      <Box>
          <Title>trending</Title>
          <Line></Line>
          <Hashtags>
            
            {hashtagsList.map(({id, name}) => {
              return <HashtagList key={id} onClick={() => seeHashtag(name)}>{name}</HashtagList>
            })}
          </Hashtags>
      </Box>
    </div>
  )
}
