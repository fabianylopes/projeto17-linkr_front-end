/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import ReactHashtag from '@mdnm/react-hashtag';
import Modal from 'react-modal';
import { IoMdHeartEmpty, IoMdHeart, IoIosTrash, IoMdCreate } from "react-icons/io";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from 'sweetalert';
import ReactTooltip from 'react-tooltip';

import { Container, Box, Image, Likes, Content, User, Description, Link, Title, Subtitle, Url, Texts, Hashtag, EditUserPost } from './style';
import { customerStyle, h1, p, buttonCancel, buttonNext } from './modalStyle';
// import { customerStyle, h1, p, buttonCancel, buttonNext, input, paiButton } from './modalStyle';
import HashtagContext from '../utils/context/HashtagContext';
import TokenContext from '../utils/context/TokenContext';
import api from '../utils/api/api';

export default function Posts(props) {
    const { posts, likes, reloadPosts } = props;
    const { token } = useContext(TokenContext);
    function likesPostId(likes, post){
        return likes.filter(like => parseInt(like.postId) === parseInt(post.id));
    }

    console.log(likes)

    if(!token){
        return <></>
    }else{
         return (
            <Container>
            {
                posts.length > 0 
                ? posts.map((post, i) => <Post key={i} post={post} reloadPosts={reloadPosts} like={likesPostId(likes, post)}/>)
                : <TailSpin color="#ffffff" size={50}/>
            }
            </Container>
        );
    }
}

export function Post({post, like, reloadPosts}){
    const navigate = useNavigate();
    const { setHash } = useContext(HashtagContext);
    const { token } = useContext(TokenContext);
    
    const [liked, setliked] = useState(false);
    const [ firstTime, setFirstTime ] = useState(true);
    const [qttLikes, setQtt] = useState(parseInt(post.likes));
    const [ buttonLike, setButtonLike ] = useState(true);
    const { id:userId, token:userToken} = token;

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
            setLoadingDelete(false);
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
            await reloadPosts();
            setEditUserPost(false);
            setDisabled(false);
        } catch (error) {
            setDisabled(false);
            swal(`Houve um erro ao atualizar seu post! Status: ${error}`);
            // setModalEdit(false);
            // setLoadingUpdate(false);
        }
    }

    // function enviarUpdate(id){
    //     setLoadingUpdate(true);

    //     if(!description){
    //         setTimeout(()=>{
    //             setLoadingUpdate(false);
    //             swal("Insira uma descrição válida!");
    //         }, 1500);
    //         setDescription("");
    //         return;
    //     }
    //     updatePost(id);
    // }

    function createMessageLike(){
        if(like.length === 0) return `Este post não possui likes até o momento...`

        const userLikes = like.map(item => item.username);
        return userLikes.join(', ');
    }
    const message = createMessageLike();

    Modal.setAppElement('.root');
    const [modalOpen, setModalOpen] = useState(false);
    // const [modalEdit, setModalEdit] = useState(false);
    // const [description, setDescription] = useState('');
    const [loadingDelete, setLoadingDelete] = useState(false);
    // const [loadingUpdate, setLoadingUpdate] = useState(false);

    return (
        <Box>
            <Image>
                <img src={post.picture} alt="Foto perfil" 
                onClick={() => navigate(`/user/${post.userId}`)}/>

                    <a data-tip data-for='likes-user'>
                        {liked ? 
                            <IoMdHeart className="icon-liked" onClick={() => setliked(!liked)}/>
                        : 
                            <IoMdHeartEmpty className="icon" onClick={() => setliked(!liked)}/>
                        }
                    </a>
                    <ReactTooltip id='likes-user'>
                        <span>{message}</span>
                    </ReactTooltip>

                <Likes>{qttLikes} likes</Likes>
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
                                            loadingDelete ? <button style={buttonNext}>
                                                <ThreeDots color="#fff" height={13} />
                                            </button> 
                                            :
                                            <button style={buttonNext} 
                                            onClick={() => { setLoadingDelete(true); deletePost(post.id);}}>
                                                Yes, delete it
                                            </button>
                                        }
                                    </p>
                                    </Modal>
                                <IoMdCreate className='icon editar' 
                                onClick={() => setEditUserPost(true)}/>
                                {/* onClick={()=> setModalEdit(true)}/> */}
                                    {/* Modal de edição como alternativa ao focus do input */}
                                    {/* <Modal isOpen={modalEdit} style={customerStyle}
                                    onRequestClose={() => {setModalEdit(false); setDescription('')}}>
                                    <div>
                                        <input style={input} type="text" placeholder='Insira a nova descrição do post'
                                        value={description} onChange={e => setDescription(e.target.value)}/>
                                        <p style={paiButton}>
                                            {
                                                loadingUpdate ? <button style={buttonNext}>
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
                                    </Modal> */}
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
    )
}