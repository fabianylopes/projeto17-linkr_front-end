import { useState, useEffect, useContext} from "react";
import swal from "sweetalert";
import { BiRefresh } from 'react-icons/bi'
import useInterval from "use-interval";

import api from "../utils/api/api";
import Header from "../Header/index.js";
import PostBox from "../PostBox/index.js";
import Posts from "../Posts/index.js";

import TokenContext from "../utils/context/TokenContext";
import { useNavigate } from "react-router-dom";

import { Container, Title, Boxes, LeftColumn, Button, Body, Text } from "./style.js";
import Trending from "../Trending";
import SearchBar from "../SearchBar";

function Timeline() {
    const navigate = useNavigate();
    const { token } = useContext(TokenContext);
    const [ posts, setPosts ] = useState([]);
    const [postsIniciais, setPostsIniciais] = useState([]);
    const [postsAtuais, setPostsAtuais] = useState([]);
    const [diff, setDiff] = useState(0);
    const [following, setFollowing] = useState([]);

    console.log('posts iniciais', postsIniciais);
    console.log('posts atuais', postsAtuais);
    
    async function loadPosts() {
        try {
            const response = await api.get(`/timeline/${token.id}`);
            setPosts(response.data);

            const posts = await api.get('/timelineall');
            setPostsIniciais(posts.data);
            setPostsAtuais(posts.data);

            const objConfig = {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            }
            const following = await api.get('/following', objConfig);
            setFollowing(following.data);
        } catch (error) {
            swal("An error occured while trying to fetch the posts, please refresh the page");
        }
    }

    useEffect(() => {
        if(!token) navigate('/')
        loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useInterval(async ()=>{
        try {
            console.log('lib funcionando');
            const response = await api.get('/timelineall');
            console.log('response all', response);
            setPostsAtuais(response.data);

            if(postsIniciais.length === postsAtuais.length){
                return;
            }else{
                setDiff(postsAtuais.length - postsIniciais.length)
                return;
            }
        } catch (error) {
            console.log('error');
            swal('Erro no servidor ao verificar atualização de posts!');
            reload();
        }
    }, 15000);

    function reload(){
        window.location.reload();
    }

    return (  
        <>
            <Container>
                <Header/>
                <SearchBar isHeader={false}/>
                <Body>
                    <Title>timeline</Title>
                    <Boxes>
                        <LeftColumn>
                            <PostBox reload={(post)=> setPosts(post)}/>
                            {
                                diff === 0 ? <></> 
                                : 
                                <Button>
                                    { 
                                        diff > 0 ? 
                                        `${Math.abs(diff)} new posts, load more!` 
                                        : `${Math.abs(diff)} posts removed, load more!` 
                                    } 
                                    <BiRefresh onClick={()=>reload()}/>
                                </Button>
                            }
                            {
                                following.length === 0 ? 
                                    <Text>You don't follow anyone yet. Search for new friends!</Text>
                                : <Posts posts={posts}/>
                            }
                        </LeftColumn>
                        <Trending/>
                    </Boxes>
                </Body>
            </Container>
        </>
    );
}

export default Timeline;