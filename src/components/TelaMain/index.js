import { useState, useEffect } from "react";
import swal from "sweetalert";

import api from "../utils/api/api";
import Header from "../Header/index.js";
import PostBox from "../PostBox/index.js";
import Posts from "../Posts/index.js";

import { Container, Title, Boxes } from "./style.js";
import Trending from "../Trending";
import { LeftColumn } from "../Hashtag/style";

function Timeline() {
    const [posts, setPosts] = useState([]);

    async function loadPosts() {
        try {
            const response = await api.get("/timeline");
            setPosts(response.data.posts);
        } catch (error) {
            swal("An error occured while trying to fetch the posts, please refresh the page");
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