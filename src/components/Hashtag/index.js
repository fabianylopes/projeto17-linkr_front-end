import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
//import InfiniteScroll from 'react-infinite-scroller';

import { Text, Boxes } from './style';
import { Container, Body } from '../TelaMain/style';
import HashtagContext from '../utils/context/HashtagContext';
import TokenContext from '../utils/context/TokenContext';
import Trending from '../Trending';
import Header from '../Header';
import Posts from '../Posts';
import api from '../utils/api/api';

export default function Hashtag() {
    const navigate = useNavigate();

    const { hash } = useContext(HashtagContext);
    const { token } = useContext(TokenContext);
    const { hashtag } = useParams();
    const [hashtagPosts, setHashtagPosts] = useState([]);
    const [likes, setLikes] = useState([]);

    useEffect(() => getHashtagPosts(), [hashtag]); // eslint-disable-line react-hooks/exhaustive-deps

    function getHashtagPosts(){
        const config ={headers: {Authorization: `Bearer ${token.token}`}};
        api.get(`/hashtag/${hashtag}`,config ).then((response) => setHashtagPosts(response.data)).catch((error) => console.log(error)); 
    }

    async function loadPosts() {
        try {
            const response = await api.get("/timeline");
            setHashtagPosts(response.data.posts);
            setLikes(response.data.usersLikes);
        } catch (error) {
            swal("An error occured while trying to fetch the posts, please refresh the page");
        }
    }

    useEffect(() => {
        if(!token.token) navigate('/')
        loadPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <Header/>
            <Body>
                <Text>#{hash}</Text>
                <Boxes>              
                    <Posts posts={hashtagPosts} likes={likes}/>
                    <Trending/>
                </Boxes>
            </Body>    
        </Container>
    )
}