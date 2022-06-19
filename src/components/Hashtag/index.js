import { useState, useEffect, useContext } from 'react';

import { Text, Boxes } from './style';
import { Container } from '../TelaMain/style';
import HashtagContext from '../utils/context/HashtagContext';
import api from '../../services/api';
import Trending from '../Trending';
import Header from '../Header';
import Posts from '../Posts';

export default function Hashtag() {

    const { hash } = useContext(HashtagContext);

    const [hashtagPosts, setHashtagPosts] = useState([]);

    useEffect(() => getHashtagPosts(), []); // eslint-disable-line react-hooks/exhaustive-deps

    function getHashtagPosts(){
        api.getPostsByHashtag(hash).then((response) => setHashtagPosts(response.data)).catch((error) => console.log(error));
        
    }

    return (
        <Container>
            <Header/>
            <Text>
                <h1>#{hash}</h1>
            </Text>
            <Boxes>              
                <Posts posts={hashtagPosts}/>
                <Trending/>
            </Boxes>
        </Container>
    )
}