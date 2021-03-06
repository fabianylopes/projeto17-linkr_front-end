import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Text, Boxes } from './style';
import { Container, Body } from '../TelaMain/style';
import TokenContext from '../utils/context/TokenContext';
import Trending from '../Trending';
import Header from '../Header';
import Posts from '../Posts';
import api from '../utils/api/api';

export default function Hashtag() {
    const navigate = useNavigate();
    
    const { hashtag } = useParams();
    const { token } = useContext(TokenContext);
    const [hashtagPosts, setHashtagPosts] = useState([]);

    function getHashtagPosts(){
        const config ={headers: {Authorization: `Bearer ${token.token}`}};
        api.get(`/hashtag/${hashtag}`,config ).then((response) => setHashtagPosts(response.data)).catch((error) => console.log(error)); 
    }

    useEffect(() => {
        if(!token.token) navigate('/')
        getHashtagPosts()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container>
            <Header/>
            <Body>
                <Text>#{hashtag}</Text>
                <Boxes>              
                    <Posts posts={hashtagPosts} getPost={getHashtagPosts}/>
                    <Trending/>
                </Boxes>
            </Body>    
        </Container>
    )
}