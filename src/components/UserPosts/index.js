import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import ReactHashtag from '@mdnm/react-hashtag';
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

import image from '../../img/image.png';
import { Container, Box, Image, Likes, Content, User, Description, Link, Title, Subtitle, Url, Texts, Hashtag } from './style';
import HashtagContext from '../utils/context/HashtagContext';

export default function UserPosts({ userData }) {
    const navigate = useNavigate();

    const { setHash } = useContext(HashtagContext);

    const [liked, setliked] = useState(false);

    function seeHashtag(hash){
        setHash(hash);
        navigate(`/hashtag/${hash.substr(1)}`)
    }

    return (
        <Container>
            {userData.userPosts?.map(({id, description, url, likes}) => {
                return (
                    <Box key={id}>
                        <Image>
                            <img src={userData.picture} alt="Foto perfil"/>

                            {liked ? 
                            <IoMdHeart className="icon-liked" onClick={() => setliked(!liked)}/> 
                            : 
                            <IoMdHeartEmpty className="icon" onClick={() => setliked(!liked)}/>
                            }
                            
                            <Likes>{likes} likes</Likes>
                        </Image>
                        <Content>                                   
                            <User>{userData.username}</User>
                            <Description>

                                <ReactHashtag
                                    renderHashtag={(hashtagValue) => <Hashtag onClick={() => seeHashtag(hashtagValue)}>{hashtagValue}</Hashtag>}
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