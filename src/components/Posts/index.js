import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import ReactHashtag from '@mdnm/react-hashtag';
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

import { Container, Box, Image, Likes, Content, User, Description, Link, Title, Subtitle, Url, Texts, Hashtag } from './style';
import api from '../../services/api';
import HashtagContext from '../utils/context/HashtagContext';

export default function Posts() {
    const navigate = useNavigate();

    const { setHash } = useContext(HashtagContext);

    const [postsList, setPostList] = useState([]);
    const [liked, setliked] = useState(false);

    useEffect(() => seePosts(), []);

    function seePosts(){

        api.getPosts().then((response) => setPostList(response.data.posts)).catch((error) => console.log(error));
    }

    function seeHashtag(hash){
        setHash(hash);
        navigate(`/hashtag/${hash.substr(1)}`)
    }



    return (
        <Container>
   
            {postsList.map((post) => {
                return (

                    <Box key={post.id}>
                        <Image>
                            <img src={post.picture} alt="Foto perfil"/>

                            {liked ? 
                            <IoMdHeart className="icon-liked" onClick={() => setliked(!liked)}/> 
                            : 
                            <IoMdHeartEmpty className="icon" onClick={() => setliked(!liked)}/>
                            }
                            
                            <Likes>{post.likes} likes</Likes>
                        </Image>
                        <Content>                                   
                            <User>{post.username}</User>
                            <Description>

                                <ReactHashtag
                                    renderHashtag={(hashtagValue, i) => <Hashtag key={i} onClick={() => seeHashtag(hashtagValue)}>{hashtagValue}</Hashtag>}
                                >
                                    {post.description}
                                </ReactHashtag>
                    
                            </Description>
                            <Link href={post.url} target="_blank">
                                <Texts>
                                    <Title>{post.title}</Title>
                                    <Subtitle>{post.descriptionMetadata}</Subtitle>
                                    <Url>{post.url}</Url>
                                </Texts>
                                <img src={post.image} alt="Foto link"/>
                            </Link>
                        </Content>
                    </Box>
                );
            })}
        </Container>
  )
}