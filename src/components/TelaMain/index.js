import { useState, useEffect, useContext} from "react";
import swal from "sweetalert";

import api from "../utils/api/api";
import Header from "../Header/index.js";
import PostBox from "../PostBox/index.js";
import Posts from "../Posts/index.js";

import TokenContext from "../utils/context/TokenContext";
import { useNavigate } from "react-router-dom";

import { Container, Title, Boxes } from "./style.js";
import Trending from "../Trending";
import { LeftColumn } from "../Hashtag/style";

function Timeline() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const { token:localToken } = useContext(TokenContext);
    
    async function loadPosts() {
        try {
            const response = await api.get("/timeline");
            setPosts(response.data.posts);
        } catch (error) {
            swal("An error occured while trying to fetch the posts, please refresh the page");
        }
    }

    useEffect(() => {
        if(!localToken) navigate('/')
        loadPosts();
    }, []);

    return (  
        <>
            <Container>
                <Header/>
                <Title>timeline</Title>
                <Boxes>
                    <LeftColumn>
                        <PostBox reload={(post)=> setPosts(post)}/>
                        <Posts posts={posts}/>
                    </LeftColumn>
                    <Trending/>
                </Boxes>
            </Container>
        </>
    );
}

export default Timeline;