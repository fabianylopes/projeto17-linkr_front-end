import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ReactHashtag from '@mdnm/react-hashtag';
import Modal from 'react-modal';

import { IoMdHeartEmpty, IoMdHeart, IoIosTrash, IoMdCreate } from "react-icons/io";
import swal from 'sweetalert';
import { TailSpin } from "react-loader-spinner";

import api from '../utils/api/api';
import { Container, Box, Image, Likes, Content, User, Description, Link, Title, Subtitle, Url, Texts, Hashtag } from './style';
import HashtagContext from '../utils/context/HashtagContext';
import TokenContext from '../utils/context/TokenContext';

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
    const { token } = useContext(TokenContext);
    
    const [liked, setliked] = useState(false);
    const [ firstTime, setFirstTime ] = useState(true);
    const [qttLikes, setQtt] = useState(parseInt(post.likes));
    const [ buttonLike, setButtonLike ] = useState(true);
    const { id:userId, token:userToken} = token;

    useEffect(()=>{
        const config ={headers: {Authorization: `Bearer ${token.token}`}};

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
    },[liked]);

    const dadosStorage = JSON.parse(localStorage.getItem("infoUsers"));
    const { token: tokenStorage, id } = dadosStorage;
    console.log(tokenStorage, id);

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
            sucessOrError("delete");
            setModalOpen(false);
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch(error){
            swal(`Houve um erro ao deletar seu post! Status: ${error.response.status}`);
            setModalOpen(false);
        }
    }

    async function updatePost(e, id){
        e.preventDefault();
        alert('teste update', id);
        // const objConfig = {
        //     headers: {
        //         Authorization: `Bearer ${tokenStorage}`
        //     }
        // }

        // try {
        //     await api.put(`/timeline/${id}`, {url: url}, objConfig);
        //     sucessOrError("update");
        //     setModalEdit(false);
        // } catch (error) {
        //     swal(`Houve um erro ao atualizar seu post! Status: ${error.response.status}`);
        //     setModalEdit(false);
        // }
    }

    Modal.setAppElement('.root');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [url, setUrl] = useState('');

    const customerStyle = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '40%',
            height: '40%',
            backgroundColor: '#333333',
            borderRadius: '10px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around'
        }
    }

    const h1 = {
        'font-family': 'Lato',
        'font-size': '34px',
        'font-weight': '700',
        'line-height': '41px',
        'letter-spacing': '0em',
        'text-align': 'center',
        'color': '#FFFFFF'
    }

    const p = {
        'width': '60%',
        'font-family': 'Lato',
        'font-size': '18px',
        'font-weight': '700',
        'line-height': '22px',
        'letter-spacing': '0em',
        'text-align': 'left',
        'display': 'flex',
        'justify-content': 'space-evenly',
        'align-items': 'center'
    }

    const buttonCancel = {
        'width': '40%',
        'height': '40px',
        'border-radius': '5px',
        'background-color': '#FFFFFF',
        'color': '#1877F2'
    }

    const buttonNext = {
        'width': '40%',
        'height': '40px',
        'border-radius': '5px',
        'color': '#FFFFFF',
        'background-color': '#1877F2'
    }

    const input = {
        'width': '100%',
        'height': '35px',
        'margin-bottom': '20px',
        'padding': '15px',
        'display': 'inline-block',
        'justify-content': 'center',
        'align-items': 'center'
    }

    const paiButton = {
        'width': '100%',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center'
    }

    return (
        <Box>
            <Image>
                <img src={post.picture} alt="Foto perfil" 
                onClick={() => navigate(`/user/${post.userId}`)}/>

                {liked ? 
                <IoMdHeart className="icon-liked"  onClick={() => setliked(!liked)}/> 
                : 
                <IoMdHeartEmpty className="icon" onClick={() => setliked(!liked)}/>
                }
                
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
                                        <button style={buttonNext} onClick={() => deletePost(post.id)}>Yes, delete it</button>
                                    </p>
                                    </Modal>
                                <IoMdCreate className='icon editar' onClick={()=> setModalEdit(true)}/>
                                    <Modal isOpen={modalEdit} style={customerStyle}
                                    onRequestClose={() => setModalEdit(false)}>
                                    <form onSubmit={updatePost}>
                                        <input style={input} type="text" placeholder='Insira a nova descrição do posts'
                                        value={url} onChange={e => setUrl(e.target.value)} required/>
                                        <p style={paiButton}>
                                            <button type="submit" style={buttonNext}>Update</button>
                                        </p>
                                    </form>
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
    );
}