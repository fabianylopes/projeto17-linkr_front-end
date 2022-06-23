import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext} from "react";
import { BiRefresh } from 'react-icons/bi'
import swal from "sweetalert";
import useInterval from "use-interval";

import api from "../utils/api/api";
import Header from "../Header/index.js";
import PostBox from "../PostBox/index.js";
import Posts from "../Posts/index.js";
import Trending from "../Trending";
import SearchBar from "../SearchBar";
import TokenContext from "../utils/context/TokenContext";

import { Container, Title, Boxes, LeftColumn, Button, Body, Text } from "./style.js";

function Timeline() {
    const navigate = useNavigate();
    const { token } = useContext(TokenContext);
    const [ posts, setPosts ] = useState([])

    console.log(posts);
    
    async function loadPosts() {
        try {
            const response = await api.get(`/timeline/${token.id}`);
            setPosts(response.data);
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
        } catch (error) {
            console.log('error')
        }
    }, 5000);

    return (  
        <>
            <Container>
                <Header/>
                <SearchBar isHeader={false}/>
                <Body>
                    <Title>timeline</Title>
                    <Boxes>
                        <LeftColumn>
                            <PostBox/>
                            <Button>12 new posts, load more! <BiRefresh/></Button>
                            {
                            posts.length === 0 ? 
                                <Text>There are no posts yet</Text>
                            : <Posts posts={posts} />
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