import { useState, useEffect, useContext } from 'react';

import { Text, Boxes, LeftColumn, Box, Title, Line, Hashtags, HashtagList } from './style';
import { Container } from '../TelaMain/style';
import api from '../../services/api';
import Header from '../Header';
import Posts from '../Posts';
import HashtagContext from '../utils/context/HashtagContext';

export default function Hashtag() {

    const { hash } = useContext(HashtagContext);

    const [hashtagsList, setHastagList] = useState([]);

    useEffect(() => hashtags(), []);


    function hashtags(){
        api.getHashtags().then((response) => setHastagList(response.data)).catch((error) => console.log(error));
        
    }

    return (
        <Container>
            <Header/>
            <Text>{hash}</Text>
            <Boxes>
            <LeftColumn>
                <Posts/>
            </LeftColumn>
            <Box>
                <Title>trending</Title>
                <Line></Line>
                <Hashtags>
                    
                    {hashtagsList.map(({name, id}) => {
                    return (
                        <a href={`/hashtag/${name.substr(1)}`}>
                        <HashtagList key={id}>{name}</HashtagList>
                        </a>
                        );
                    })}
    
                </Hashtags>
            </Box>
            </Boxes>
        </Container>
    )
}