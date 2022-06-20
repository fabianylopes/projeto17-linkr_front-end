import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Text, Boxes } from './style';
import { Container, Body } from '../TelaMain/style';
import HashtagContext from '../utils/context/HashtagContext';
import TokenContext from '../utils/context/TokenContext';
import api from '../../services/api';
import Trending from '../Trending';
import Header from '../Header';
import Posts from '../Posts';

export default function Hashtag() {
    const navigate = useNavigate();

    const { hash } = useContext(HashtagContext);
    const { token } = useContext(TokenContext);

    const [hashtagPosts, setHashtagPosts] = useState([]);

    useEffect(() => !token.token && navigate("/"), []); // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
    api.getPostsByHashtag(hash, token.token).then(response => setHashtagPosts(response.data)).catch(error => {
        console.log(error);
        alert("Does not exist posts with this hashtag.");
        navigate("/");
    });
    }, []);


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