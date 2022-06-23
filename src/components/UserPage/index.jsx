import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Header from "../Header/index.js";
import TokenContext from "../utils/context/TokenContext.js";
import Trending from "../Trending/index.js";
import { Container, Picture, Title, Username, PostsContainer, Text, Box } from "./style";
import api from "../../services/api.js";
import { TailSpin } from "react-loader-spinner";
import SearchBar from "../SearchBar/index.jsx";
import { Post } from "../Posts/index.js";

export default function UserPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { token } = useContext(TokenContext);
    const [ userData, setUserData ] = useState({});
    const [ userPosts, setUserPosts ] = useState([]);

    useEffect(() => !token.token && navigate("/"), []); 

    useEffect(() => {
        api.getPostsByUserId(id, token.token).then(response => {
            setUserData(response.data.userData);
            setUserPosts(response.data.posts);
        }).catch(error => {
            console.log(error);
            alert("User does not exist.");
            navigate("/");
        });
    }, [id]);

    return (  
        <Container>
            <Header/>
            <SearchBar isHeader={false}/>
            <PostsContainer>
                {!userPosts ?
                <TailSpin color="#ffffff" size={50}/> :
                <>
                    <Title>
                        <Picture src={userData.picture}/>
                        <Username>{userData.username}'s posts</Username>
                    </Title>
                    {userPosts?.length === 0 ? 
                        <Text>{userData.username} has no posts yet...</Text>
                    : 
                        userPosts?.map((post, i) => 
                            <Post key={i} infoPost={post}/>
                        )
                    }
                </>
                }
            </PostsContainer>
            <Box>
                <Trending/>
            </Box>
        </Container>
    );
}