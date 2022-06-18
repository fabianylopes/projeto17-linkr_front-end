import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Header from "../Header/index.js";
import TokenContext from "../utils/context/TokenContext.js";

import { Container, Picture, Title, Username, PostsContainer, Hastags } from "./style.js";
import api from "../../services/api.js";
import UserPosts from "../UserPosts/index.js";

export default function UserPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { token } = useContext(TokenContext);
    const [ userData, setUserData ] = useState({});

    useEffect(() => !token.token && navigate("/"), []);
    
    useEffect(() => {
    
    api.getPostsByUserId(id, token.token).then(response => setUserData(response.data)).catch(error => console.log(error));
    }, []);

    return (  
        <Container>
            <Header/>
            <PostsContainer>
                <Title>
                    <Picture src={userData.picture}/>
                    <Username>{userData.username}'s posts</Username>
                </Title>
                <UserPosts userData={userData} />
            </PostsContainer>
            <Hastags/>
        </Container>
    );
}