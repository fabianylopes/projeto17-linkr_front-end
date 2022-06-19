import { useState, useEffect } from "react";
import swal from "sweetalert";

import api from "../utils/api/api";
import Header from "../Header/index.js";
import PostBox from "../PostBox/index.js";
import Posts from "../Posts/index.js";

import { Container, Title } from "./style.js";

function Timeline() {
    const [posts, setPosts] = useState([]);

    async function loadPosts() {
        try {
            const response = await api.get("/timeline");
            setPosts(response.data.posts);
        } catch (error) {
            swal(`Erro ao carregar posts na tela!`);
        }
    }

    useEffect(() => {
        loadPosts();
    }, []);

    return (  
        <>
            <Container>
                <Header/>
                <Title>timeline</Title>
                <PostBox reload={(post)=> setPosts(post)}/>
                <Posts posts={posts}/>
            </Container>
        </>
    );
}

export default Timeline;