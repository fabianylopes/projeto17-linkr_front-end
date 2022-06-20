import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import ReactHashtag from '@mdnm/react-hashtag';
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { TailSpin } from "react-loader-spinner";

import { Container, Box, Image, Likes, Content, User, Description, Link, Title, Subtitle, Url, Texts, Hashtag } from './style';
import HashtagContext from '../utils/context/HashtagContext';

export default function Posts(props) {
    const { posts } = props;

    return (
        <Container>
            {
                posts.length > 0 ?
                  posts.map((post, i) => <Post key={i} post={post} />)
                : <TailSpin color="#ffffff" size={50}/>
            }
        </Container>
    );
}

function Post({post}){

    const navigate = useNavigate();
    const { setHash } = useContext(HashtagContext);
    const [liked, setliked] = useState(false);

    function seeHashtag(hash){
        setHash(hash.substr(1));
        navigate(`/hashtag/${hash.substr(1)}`)
    }


    return (
        <Box >
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
                    {
                        post.description ? 
                        <Description>
                            <ReactHashtag
                                renderHashtag={
                                    (hashtagValue, i) => 
                                    <Hashtag key={i} onClick={() => seeHashtag(hashtagValue)}>
                                        {hashtagValue}
                                    </Hashtag>
                                }
                            >
                                {post.description}
                            </ReactHashtag>
                        </Description>
                        : <></>
                    }
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
}