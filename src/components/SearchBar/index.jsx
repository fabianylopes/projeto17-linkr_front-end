import { Container, Input } from "./style";
import { IoSearchOutline } from 'react-icons/io5';

export default function SearchBar({isHeader}) {
    return (
        <Container isHeader={isHeader}>
            <Input placeholder="Search for people" />
            <IoSearchOutline color="#C6C6C6" size={21} />
        </Container>
    );
}