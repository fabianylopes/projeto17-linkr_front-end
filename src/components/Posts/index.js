import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import reactHashtag from '@mdnm/react-hashtag';
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

import { Container, Box, Image, Likes, Content, User, Description, Link, Title, Subtitle, Url, Texts, Hashtag } from './style';
import HashtagContext from '../utils/context/HashtagContext';

export default function Posts(props) {
    const { posts } = props;

    const navigate = useNavigate();
    const { setHash } = useContext(HashtagContext);
    const [liked, setliked] = useState(false);

    function seeHashtag(hash){
        setHash(hash);
        navigate(`/hashtag/${hash.substr(1)}`)
    }

    return (
        <Container>
            {
                posts.length > 0 ?
                    posts.map((post) => {
                        return (
                            <Box key={post.id}>
                                <Image>
                                    <img src={post.picture} alt="Foto perfil" 
                                    onClick={() => navigate(`/user/${post.userId}`)}/>
        
                                    {liked ? 
                                    <IoMdHeart className="icon-liked" onClick={() => setliked(!liked)}/> 
                                    : 
                                    <IoMdHeartEmpty className="icon" onClick={() => setliked(!liked)}/>
                                    }
                                    
                                    <Likes>{post.likes} likes</Likes>
                                </Image>
                                <Content>                                   
                                    <User onClick={() => navigate(`/user/${post.userId}`)}>{post.username}</User>
                                    <Description>
                                            <reactHashtag
                                                renderHashtag={
                                                    (hashtagValue, i) => 
                                                    <Hashtag key={i} onClick={() => seeHashtag(hashtagValue)}>
                                                        {hashtagValue}
                                                    </Hashtag>
                                                }
                                            >
                                                {post.description}
                                            </reactHashtag>
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
                    })
                : <h1>Loading...</h1>
            }
        </Container>
    );
}