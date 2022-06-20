import { useState, useEffect, useContext} from "react";
import swal from "sweetalert";

import api from "../utils/api/api";
import Header from "../Header/index.js";
import PostBox from "../PostBox/index.js";
import Posts from "../Posts/index.js";

import TokenContext from "../utils/context/TokenContext";
import { useNavigate } from "react-router-dom";

import { Container, Title, Boxes, LeftColumn, Body, Text } from "./style.js";
import Trending from "../Trending";
import SearchBar from "../SearchBar";

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                            {posts.length === 0 ? 
                            <Text>There are no posts yet</Text>
                            :
                            <Posts posts={posts}/>
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