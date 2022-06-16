import { useState, useEffect, useContext } from 'react';

import { Box, Title, Line, Hashtags, Hashtag } from './style';
import api from '../../services/api';

export default function Trending() {

  const [hashtagsList, setHastagList] = useState([]);

  useEffect(() => hashtags(), []);

  function hashtags(){
    api.getHashtags().then((response) => setHastagList(response.data)).catch((error) => console.log(error));
  }

  return (
    <Box>
        <Title>trending</Title>
        <Line></Line>
        <Hashtags>
          
          {hashtagsList.map(({name}, i) => {
            return (
              <Hashtag key={i}>{name}</Hashtag>
            );
          })}

        </Hashtags>
    </Box>
  )
}
