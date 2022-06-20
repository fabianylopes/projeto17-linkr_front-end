import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Header from "../Header/index.js";
import TokenContext from "../utils/context/TokenContext.js";
import Trending from "../Trending/index.js";
import { Container, Picture, Title, Username, PostsContainer, Text, Hastags } from "./style";
import api from "../../services/api.js";
import UserPosts from "../UserPosts/index.jsx";
import { TailSpin } from "react-loader-spinner";
import SearchBar from "../SearchBar/index.jsx";

export default function UserPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { token } = useContext(TokenContext);
    const [ userData, setUserData ] = useState({});

    useEffect(() => !token.token && navigate("/"), []); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
    api.getPostsByUserId(id, token.token).then(response => setUserData(response.data)).catch(error => {
        console.log(error);
        alert("User does not exist.");
        navigate("/");
    });
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    return (  
        <Container>
            <Header/>
            <SearchBar isHeader={false}/>
            <PostsContainer>
                {!userData.userPosts ?
                <TailSpin color="#ffffff" size={50}/> :
                <>
                    <Title>
                        <Picture src={userData.picture}/>
                        <Username>{userData.username}'s posts</Username>
                    </Title>
                    {userData.userPosts?.length === 0 ? 
                        <Text>{userData.username} has no posts yet...</Text>
                    : 
                        userData.userPosts?.map(post => 
                            <UserPosts username={userData.username} picture={userData.picture} post={post}/>
                        )
                        
                    }
                </>
                }
            </PostsContainer>
            <Hastags>
                <Trending/>
            </Hastags>
        </Container>
    );
}