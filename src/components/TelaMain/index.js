import Header from "../Header/index.js";
import PostBox from "../PostBox/index.js";
import Posts from "../Posts/index.js";
import { Container, Title } from "./style.js";

function Timeline() {
    return (  
        <>
            <Container>
            <Header/>
                <Title>timeline</Title>
                <PostBox/>
                <Posts/>
            </Container>
        </>
    );
}

export default Timeline;