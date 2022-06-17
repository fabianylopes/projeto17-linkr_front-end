import { useState, useEffect } from 'react';
import ReactHashtag from '@mdnm/react-hashtag';
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

//import urlMetadata from 'url-metadata';

import image from '../../img/image.png';
import { Container, Box, Image, Likes, Content, User, Description, Link, Title, Subtitle, Url, Texts, Hashtag } from './style';
import api from '../../services/api';

export default function Posts() {

    const [postsList, setPostList] = useState([]);
    const [liked, setliked] = useState(false);

    useEffect(() => seePosts(), []);

    function seePosts(){

        api.getPosts().then((response) => setPostList(response.data.posts)).catch((error) => console.log(error));
    }


    return (
        <Container>
            {postsList.map(({id, username, picture, description, url, likes}) => {
                return (

                    <Box key={id}>
                        <Image>
                            <img src={picture} alt="Foto perfil"/>

                            {liked ? 
                            <IoMdHeart className="icon-liked" onClick={() => setliked(!liked)}/> 
                            : 
                            <IoMdHeartEmpty className="icon" onClick={() => setliked(!liked)}/>
                            }
                            
                            <Likes>{likes} likes</Likes>
                        </Image>
                        <Content>                                   
                            <User>{username}</User>
                            <Description>

                                <ReactHashtag
                                    renderHashtag={(hashtagValue) => <Hashtag>{hashtagValue}</Hashtag>}
                                >
                                    {description}
                                </ReactHashtag>
                    
                            </Description>
                            <Link>
                                <Texts>
                                    <Title>Como aplicar o Material UI em um projeto React</Title>
                                    <Subtitle>Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.</Subtitle>
                                    <Url>{url}</Url>
                                </Texts>
                                <img src={image} alt="Foto link"/>
                            </Link>

                        </Content>
                    </Box>
                );
            })}
        </Container>
  )
}


