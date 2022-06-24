import { CommentContainer, Container, WriteComment } from "./styled.jsx";
import { IoPaperPlaneOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import api from "../../services/api.js";
import TokenContext from "../utils/context/TokenContext.js";

export default function Comments({ infoPost: {post, comments}, setUserComments, getPost }) {
    
    const [ userComment, setUserComment ] = useState("");
    const { token } = useContext(TokenContext);
    

    function sendComment(e) {
        e.preventDefault();
        api.postComment(token.token, post.id, userComment).then(() => {
            setUserComment("");
            getPost();
        }).catch(e => console.log(e));
    }

    return (
        <Container>
            {comments.map((comment, i) =>
                <CommentReady key={i} comment={comment} setUserComments={setUserComments}/>            
            )}

            <WriteComment>
                <img src= {token.image} alt="Foto de Perfil"/>
                <form onSubmit={sendComment}>
                    <input type="text" placeholder="write a comment"
                    value={userComment} onChange={e => setUserComment(e.target.value)}
                    />
                    <button type="submit">
                        <IoPaperPlaneOutline size={15} color="#F3F3F3" cursor="pointer"/>
                    </button>
                </form>
            </WriteComment>
        </Container>
    );
}

function CommentReady({ comment, setUserComments }) {
    const navigate = useNavigate();
    console.log(comment);
    return (
        <CommentContainer>
            <img src={comment.picture} alt="Foto de Perfil" />
            <section>
                <h1 onClick={() => {
                    navigate(`/user/${comment.userId}`);
                    setUserComments(false);}
                }>
                    {comment.username}
                    {comment.isMe ?
                        <em> • post's author </em> :
                        (comment.isMyFollowing ?
                        <em> • following </em> :
                        <></>
                        )
                    }
                    </h1>
                <p>{comment.comment}</p>
            </section>
        </ CommentContainer>
    );
}