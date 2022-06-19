import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import ReactHashtag from '@mdnm/react-hashtag';
import { IoMdHeartEmpty, IoMdHeart, IoIosTrash, IoMdCreate } from "react-icons/io";
import swal from 'sweetalert';

import api from '../utils/api/api';
import { Container, Box, Image, Likes, Content, User, Description, Link, Title, Subtitle, Url, Texts, Hashtag } from './style';
import HashtagContext from '../utils/context/HashtagContext';

export default function Posts(props) {
    const { posts } = props;

    return (
        <Container>
            {
                posts.length > 0 ?
                  posts.map((post, i) => <Post key={i} post={post} />)
                : <h1>Loading...</h1>
            }
        </Container>
    );
}

function Post({post}){
    console.log(post);
    const navigate = useNavigate();
    const { setHash } = useContext(HashtagContext);
    const [liked, setliked] = useState(false);

    const dadosStorage = JSON.parse(localStorage.getItem("infoUsers"));
    const { token } = dadosStorage;

    function seeHashtag(hash){
        setHash(hash);
        navigate(`/hashtag/${hash.substr(1)}`)
    }

    function sucessOrError(type){
        if(type === "delete"){
            return swal("Post deletado com sucesso!");
        }else{
            if(type === "update") return swal("Post atualizado com sucesso!");
        }
    }

    async function deletePost(id){
        const objConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        
        try{
            await api.delete(`/timeline/${id}`, objConfig);
            sucessOrError("delete");
        } catch(error){
            swal(`Houve um erro ao deletar seu post! Status: ${error.response.status}`);
        }
    }

    async function updatePost(id){
        const objConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try {
            await api.put(`/timeline/${id}`, {url: 'alguma coisa'}, objConfig);
            sucessOrError("update");
        } catch (error) {
            swal(`Houve um erro ao atualizar seu post! Status: ${error.response.status}`);
        }
    }

    return (
        <Box>
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
                    {
                        post.userId === 17 ? 
                            <User onClick={() => navigate(`/user/${post.userId}`)}>
                                {post.username}
                                <IoIosTrash className='icon lixeira' onClick={()=> deletePost(post.id)}/>
                                <IoMdCreate className='icon editar' onClick={()=> updatePost()}/>
                            </User>
                        :   <User onClick={() => navigate(`/user/${post.userId}`)}>
                                {post.username}
                            </User>
                    }
                    {
                        post.description ? 
                        <Description>
                            <ReactHashtag
                                renderHashtag={
                                    (hashtagValue, i) => 
                                    <Hashtag onClick={() => seeHashtag(hashtagValue)}>
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