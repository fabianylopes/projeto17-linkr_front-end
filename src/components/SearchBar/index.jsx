import { Container, UserContainer } from "./style";
import { IoSearchOutline } from 'react-icons/io5';
import { useContext, useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { useNavigate } from "react-router-dom";
import TokenContext from "../utils/context/TokenContext";
import api from "../../services/api";
import { TailSpin } from "react-loader-spinner";

export default function SearchBar({isHeader}) {
    const [isSearching, setIsSearching] = useState(false);
    const [searchedUser, setSearchedUser] = useState("");
    const [ usersList, setUsersList ] = useState([0]);
    const { token } = useContext(TokenContext);
    const navigate = useNavigate();

    useEffect(() => !token.token && navigate("/"), []);

    function redirectToUserPage(id) {
        navigate(`/user/${id}`);
        setIsSearching(false);
        setSearchedUser("");
        setUsersList([0]);
    }

    function searching(e) {
        e.preventDefault();
        setIsSearching(true);
        setSearchedUser(e.target.value);

        if (e.target.value==="") return;

        api.getSearchedUsers(e.target.value, token.token).then(response => {
            setUsersList(response.data);
            setIsSearching(false);
        }).catch(error => console.log(error));
    
    }

    return (
        <Container isHeader={isHeader} isSearching={isSearching}>
            <form>
                <DebounceInput type="text" placeholder="Search for people" 
                value={searchedUser} required
                onChange={e => searching(e)} 
                minLength={3} debounceTimeout={300}
                title="Digite pelo menos 3 caracteres para buscar o usuário"
                pattern="/[0-9a-zA-Z]{3,}/"/>
                <IoSearchOutline color="#C6C6C6" 
                size={21} cursor="pointer" />
            </form>
            
            {isSearching ?
            <TailSpin color="#515151" height={20} width={20}/> :
            (usersList.length===0 ?
                <></> :
            (usersList[0] === 0 ?
            <></> :
            usersList?.map(user => <User key={user.id} user={user} redirectToUserPage={redirectToUserPage}/>)
            ))
            }
        </Container>
    );
}

function User({ user: {id, username, picture}, redirectToUserPage}) {
    return (
        <UserContainer onClick={() => redirectToUserPage(id)}>
            <img src={picture} alt="foto de perfil"/>
            <p>{username}</p>
        </UserContainer>
    );
}