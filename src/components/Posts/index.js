import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ReactHashtag from '@mdnm/react-hashtag';
import Modal from 'react-modal';
import swal from 'sweetalert';
import { IoMdHeartEmpty, IoMdHeart, IoIosTrash, IoMdCreate } from "react-icons/io";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { AiOutlineComment } from 'react-icons/ai';
import { BiRepost } from 'react-icons/bi';

import { Container, BoxReposted, Box, Image, Actions, Action, Text, Content, User, Description, Link, Title, Subtitle, Url, Texts, Hashtag } from './style';
import { customerStyle, h1, p, buttonCancel, buttonNext, input, paiButton } from './modalStyle';
import HashtagContext from '../utils/context/HashtagContext';
import TokenContext from '../utils/context/TokenContext';
import api from '../utils/api/api';


export default function Posts(props) {
    const { posts } = props;
    const { token } = useContext(TokenContext);

    if(!token){
        return <></>
    }else{
         return (
            <Container>
            {
                posts.length > 0 
                ? posts.map((post, i) => <Post key={i} post={post} />)
                : <TailSpin color="#ffffff" size={50}/>
            }
            </Container>
        );
    }
}

export function Post({post}){
    const navigate = useNavigate();
    const { setHash } = useContext(HashtagContext);
    const { token } = useContext(TokenContext);
    
    const [liked, setliked] = useState(false);
    const [ firstTime, setFirstTime ] = useState(true);
    const [qttLikes, setQtt] = useState(parseInt(post.likes));
    const [ buttonLike, setButtonLike ] = useState(true);
    const { id:userId, token:userToken} = token;

    useEffect(()=>{
        const config ={headers: {Authorization: `Bearer ${token.token}`}};
        if(!token) navigate('/')
        if (firstTime){
            api.get(`/like/${post.id}/${userId}`, config)
            .then(res => { 
                setliked(res.data);
                setFirstTime(false);
            })
            .catch(erro=>{console.log('erro ao obter likes: ', erro)});
        }else{
            if(buttonLike){

                setButtonLike(false); //desativa o botão de requisição e só reativa quando a requisição é respondida

                if(liked){
                api.post(`/like/${post.id}/${userId}`, {userToken})   
                    .then(res => {
                        setliked(true);
                        setQtt(qttLikes+1);
                        setButtonLike(true);
                    })
                    .catch(error => console.log('não foi possivel dar deslike:', error))
                
                }else{
                    api.delete(`/dislike/${post.id}/${userId}`, {userToken})   
                        .then(res => {
                            setliked(false);
                            setQtt(qttLikes-1);
                            setButtonLike(true);
                        })
                        .catch(error => console.log('não foi possivel dar deslike:', error));
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[liked]);

    const dadosStorage = JSON.parse(localStorage.getItem("infoUsers"));
    const { token: tokenStorage, id } = dadosStorage;

    function seeHashtag(hash){
        setHash(hash.substr(1));
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
                Authorization: `Bearer ${tokenStorage}`
            }
        }
        
        try{
            await api.delete(`/timeline/${id}`, objConfig);
            setTimeout(()=>{
                sucessOrError("delete");
                setModalOpen(false);
            }, 1000);
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        } catch(error){
            swal(`Houve um erro ao deletar seu post! Status: ${error.response.status}`);
            setModalOpen(false);
            setLoading(false);
        }
    }

    async function sharePost(postId, userId){
        const body = { postId, userId }

        const objConfig = {
            headers: {Authorization: `Bearer ${tokenStorage}`}
        }
        
        try{
            await api.post(`/post/${postId}`, body, objConfig);
            setTimeout(()=>{
                swal("Post compartilhado com sucesso!");
                setModalOpen(false);
            }, 1000);
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        } catch(error){
            swal(`Houve um erro ao compartilhar seu post! Status: ${error.response.status}`);
            setModalOpen(false);
            setLoading(false);
        }
    }

    async function updatePost(id){
        const objConfig = {
            headers: {
                Authorization: `Bearer ${tokenStorage}`
            }
        }

        try {
            await api.put(`/timeline/${id}`, {description: description}, objConfig);
            setTimeout(()=>{
                sucessOrError("update");
                setModalEdit(false);
            }, 1000);
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        } catch (error) {
            swal(`Houve um erro ao atualizar seu post! Status: ${error.response.status}`);
            setModalEdit(false);
            setLoading(false);
        }
    }

    function enviarUpdate(id){
        setLoading(true);

        if(!description){
            setTimeout(()=>{
                setLoading(false);
                swal("Insira uma descrição válida!");
            }, 1500);
            setDescription("");
            return;
        }
        updatePost(id);
    }

    Modal.setAppElement('.root');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <BoxReposted>
            <div className='reposted-div'>
                <BiRepost className="icon"/>
                <h4>Re-posted by <span>{token.username}</span></h4>
            </div>
            <Box>
                <Image>
                    <img src={post.picture} alt="Foto perfil" 
                    onClick={() => navigate(`/user/${post.userId}`)}/>
                    <Actions>
                        <Action>
                            {liked ? 
                            <IoMdHeart className="icon-liked"  onClick={() => setliked(!liked)}/> 
                            : 
                            <IoMdHeartEmpty className="icon" onClick={() => setliked(!liked)}/>
                            }                    
                            <Text>{qttLikes} likes</Text>
                        </Action>

                        <Action>
                            <AiOutlineComment className="icon"/>
                            <Text>comments</Text>
                        </Action>

                        <Action>
                            <BiRepost className="icon" onClick={()=> setModalOpen(true)}/>

                            <Modal isOpen={modalOpen} style={customerStyle}
                                    onRequestClose={() => setModalOpen(false)}>
                                    <h1 style={h1}>Do you want to re-post this link?</h1>
                                    <p style={p}>
                                        <button style={buttonCancel} onClick={() => setModalOpen(false)}>No, cancel</button>
                                        {
                                            loading ? <button style={buttonNext}>
                                                <ThreeDots color="#fff" height={13} />
                                            </button> 
                                            :
                                            <button style={buttonNext} 
                                            onClick={() => { setLoading(true); sharePost(post.id, post.userId);}}>
                                                Yes, share!
                                            </button>
                                        }
                                    </p>
                            </Modal>

                            <Text>re-posts</Text>
                        </Action>   
                    </Actions>

                </Image>
                <Content>                                   

                        {
                            post.userId === parseInt(id) ? 
                                <User>
                                    <p onClick={() => navigate(`/user/${post.userId}`)}>{post.username}</p>
                                    <IoIosTrash className='icon lixeira' onClick={()=> setModalOpen(true)}/>
                                        <Modal isOpen={modalOpen} style={customerStyle}
                                        onRequestClose={() => setModalOpen(false)}>
                                        <h1 style={h1}>Are you sure you want to delete this post?</h1>
                                        <p style={p}>
                                            <button style={buttonCancel} onClick={() => setModalOpen(false)}>No, go back</button>
                                            {
                                                loading ? <button style={buttonNext}>
                                                    <ThreeDots color="#fff" height={13} />
                                                </button> 
                                                :
                                                <button style={buttonNext} 
                                                onClick={() => { setLoading(true); deletePost(post.id);}}>
                                                    Yes, delete it
                                                </button>
                                            }
                                        </p>
                                        </Modal>
                                    <IoMdCreate className='icon editar' onClick={()=> setModalEdit(true)}/>
                                        {/* Modal de edição como alternativa ao focus do input */}
                                        <Modal isOpen={modalEdit} style={customerStyle}
                                        onRequestClose={() => {setModalEdit(false); setDescription('')}}>
                                        <div>
                                            <input style={input} type="text" placeholder='Insira a nova descrição do post'
                                            value={description} onChange={e => setDescription(e.target.value)}/>
                                            <p style={paiButton}>
                                                {
                                                    loading ? <button style={buttonNext}>
                                                        <ThreeDots color="#fff" height={13} />
                                                    </button>
                                                    :
                                                    <button type="submit" style={buttonNext}
                                                    onClick={()=> enviarUpdate(post.id)}>
                                                        Update
                                                    </button>
                                                }
                                            </p>
                                        </div>
                                        </Modal>
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
        </BoxReposted>
    )
}