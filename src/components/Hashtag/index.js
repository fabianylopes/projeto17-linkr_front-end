import { useState, useEffect, useContext } from 'react';

import { Text, Boxes } from './style';
import { Container } from '../TelaMain/style';
import Header from '../Header';
import HashtagContext from '../utils/context/HashtagContext';
import Trending from '../Trending';
import api from '../../services/api';
import Posts from '../Posts';

export default function Hashtag() {

    const { hash } = useContext(HashtagContext);


    const [hashtagPosts, setHashtagPosts] = useState([]);

    useEffect(() => getHashtagPosts(), []); // eslint-disable-line react-hooks/exhaustive-deps


    function getHashtagPosts(){
        api.getPostsByHashtag(hash).then((response) => setHashtagPosts(response.data)).catch((error) => console.log(error));
        
    }

    console.log(hashtagPosts);
    console.log(hash);


    return (
        <Container>
            <Header/>
            <Text>#{hash}</Text>
            <Boxes>              
                <Posts posts={hashtagPosts}/>
                <Trending/>
            </Boxes>
        </Container>
    )
}