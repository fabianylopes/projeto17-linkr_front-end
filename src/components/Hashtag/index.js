import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { Text, Boxes } from './style';
import { Container, Body } from '../TelaMain/style';
import HashtagContext from '../utils/context/HashtagContext';
import TokenContext from '../utils/context/TokenContext';
import Trending from '../Trending';
import Header from '../Header';
import Posts from '../Posts';
import api from '../utils/api/api';

export default function Hashtag() {

    const { hash } = useContext(HashtagContext);
    const { token } = useContext(TokenContext);
    const { hashtag } = useParams();
    const [hashtagPosts, setHashtagPosts] = useState([]);

    useEffect(() => getHashtagPosts(), [hashtag]); // eslint-disable-line react-hooks/exhaustive-deps

    function getHashtagPosts(){
        const config ={headers: {Authorization: `Bearer ${token.token}`}};
        api.get(`/hashtag/${hashtag}`,config ).then((response) => setHashtagPosts(response.data)).catch((error) => console.log(error)); 
    }

    return (
        <Container>
            <Header/>
            <Body>
                <Text>#{hash}</Text>
                <Boxes>              
                    <Posts posts={hashtagPosts}/>
                    <Trending/>
                </Boxes>
            </Body>    
        </Container>
    )
}