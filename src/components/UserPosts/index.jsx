import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import ReactHashtag from '@mdnm/react-hashtag';
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { Container, Image, Likes, Content, User, Description, Link, Title, Subtitle, Url, Texts, Hashtag } from './style';
import HashtagContext from '../utils/context/HashtagContext';

export default function UserPosts({ username, picture, post:{id, userId, description, likes, url, title, image, descriptionMetadata} }) {
    const navigate = useNavigate();

    const { setHash } = useContext(HashtagContext);

    const [liked, setliked] = useState(false);

    function seeHashtag(hash){
        setHash(hash);
        navigate(`/hashtag/${hash.substr(1)}`)
    }
        

    return (
        <Container key={id}>
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
                <User  onClick={() => navigate(`/user/${userId}`)}>{username}</User>
                {
                    description ? 
                    <Description>
                        <ReactHashtag
                            renderHashtag={
                                (hashtagValue, i) => 
                                <Hashtag key={i} onClick={() => seeHashtag(hashtagValue)}>
                                    {hashtagValue}
                                </Hashtag>
                            }
                        >
                            {description}
                        </ReactHashtag>
                    </Description>
                    : <></>
                }
                <Link>
                    <Texts>
                        <Title>{title}</Title>
                        <Subtitle>{descriptionMetadata}</Subtitle>
                        <Url>{url}</Url>
                    </Texts>

                    <img src={image} alt="Foto link"/>
                </Link>
            </Content>
        </Container>
    );
}