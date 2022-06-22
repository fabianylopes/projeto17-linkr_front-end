/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import ReactHashtag from '@mdnm/react-hashtag';
import Modal from 'react-modal';
import swal from 'sweetalert';
import { IoMdHeartEmpty, IoMdHeart, IoIosTrash, IoMdCreate } from "react-icons/io";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { AiOutlineComment } from 'react-icons/ai';
import { BiRepost } from 'react-icons/bi';
import ReactTooltip from 'react-tooltip';

import { Container, BoxReposted, Box, Image, Actions, Action, Text, Content, User, Description, Link, Title, Subtitle, Url, Texts, Hashtag, EditUserPost } from './style';
import { customerStyle, h1, p, buttonCancel, buttonNext } from './modalStyle';
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
                ? posts.map((post, i) => <Post key={i} infoPost={post}/>)
                : <TailSpin color="#ffffff" size={50}/>
            }
            </Container>
        );
    }
}

export function Post({infoPost}){
    const navigate = useNavigate();

    const { token } = useContext(TokenContext);

    const [ post, setPost ] = useState(infoPost.post);
    const [liked, setliked] = useState(infoPost.iLiked);
    const [qttLikes, setQtt] = useState(infoPost.whoLiked.length);

    const { id:userId, token:userToken} = token;

    const { setHash } = useContext(HashtagContext);
    
    const [ buttonLike, setButtonLike ] = useState(true);

    const previousInputUserPost = useRef(null);
    const [ inputUserPost, setInputUserPost ] = useState(post.description);
    const [ disabled, setDisabled ] = useState(false);
    const [editUserPost, setEditUserPost] = useState(false);

    useEffect(() => {
        previousInputUserPost.current = inputUserPost;
    }, [inputUserPost]);

    function updateUserPost(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            setDisabled(true);
            updatePost(post.id, inputUserPost);    
        }
        if (e.keyCode === 27) {
            setInputUserPost(post.description);
            setEditUserPost(false);
        }
    }
    function likeAndDislike (){
        if(buttonLike){
            setButtonLike(false);

            if(liked){
            console.log('dislike')
            api.delete(`/dislike/${post.id}/${userId}`, {userToken})   
                .then(res => {
                setliked(false);
                setQtt(qttLikes-1);
                setButtonLike(true);
        })
        .catch(error => console.log('não foi possivel dar deslike:', error));

            }else{
                console.log('like')
                api.post(`/like/${post.id}/${userId}`, {userToken})   
                    .then(res => {
                        setliked(true);
                        setQtt(qttLikes+1);
                        setButtonLike(true);
                    })
                    .catch(error => console.log('não foi possivel dar deslike:', error))
            }
        }
        
    }//added

    const dadosStorage = JSON.parse(localStorage.getItem("infoUsers"));
    const { token: tokenStorage, id } = dadosStorage;

    function seeHashtag(hash){
        setHash(hash.substr(1));
        navigate(`/hashtag/${hash.substr(1)}`)
    }

    function sucessOrError(type){
        if(type === "delete"){
            return swal("Post deletado com sucesso!");
        }
        if(type === "update"){
            return swal("Post atualizado com sucesso!");
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

    async function updatePost(id, description){
        const objConfig = {
            headers: {
                Authorization: `Bearer ${tokenStorage}`
            }
        }

        try {
            await api.put(`/timeline/${id}`, {description: description}, objConfig);
            setEditUserPost(false);
            setDisabled(false);
            sucessOrError("update");
            setTimeout(()=>{
                window.location.reload();
                navigate('/timeline');
            }, 1000);
        } catch (error) {
            console.log(error);
            setDisabled(false);
            swal(`Houve um erro ao atualizar seu post! Status: ${error}`);
        }
    }

    function createMessageLike(){
        if(qttLikes === 0) return `Este post não possui likes até o momento...`

        const userLikes = infoPost.whoLiked.map(item => item.username);
        return userLikes.join(', ');
    }
    const message = createMessageLike();

    Modal.setAppElement('.root');
    const [modalOpen, setModalOpen] = useState(false);
    // const [modalEdit, setModalEdit] = useState(false);
    // const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    // const [loadingDelete, setLoadingDelete] = useState(false);

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
                            <a data-tip data-for='likes-user'>
                                {liked ? 
                                    <IoMdHeart className="icon-liked" onClick={() => likeAndDislike()}/>
                                : 
                                    <IoMdHeartEmpty className="icon" onClick={() => likeAndDislike()}/>
                                }
                            </a>
                            <ReactTooltip id='likes-user'>
                                <span>{message}</span>
                            </ReactTooltip>                    
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
                                        <IoMdCreate className='icon editar' onClick={() => setEditUserPost(!editUserPost)}/>
                                </User>
                            :   <User onClick={() => navigate(`/user/${post.userId}`)}>
                                {post.username}
                                </User>
                    }
                    {   editUserPost ?
                        <EditUserPost
                            type="text"
                            autoFocus
                            ref={previousInputUserPost}
                            value={inputUserPost}
                            onChange={e => setInputUserPost(e.target.value)}
                            onKeyDown={e => updateUserPost(e)}
                            disabled={disabled}
                        /> :
                        (post.description ? 
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
                        : <></>)
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