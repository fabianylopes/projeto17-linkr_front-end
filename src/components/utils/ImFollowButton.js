import {HiOutlineBadgeCheck} from 'react-icons/hi'
import styled from 'styled-components'

function ImFollowButton ({imFollower}){


    return imFollower !== null
        ?(  
            <Following>
                <h1>Following</h1>
                <HiOutlineBadgeCheck color='green' height={'50px'}/>
            </Following>
        ):<></>
}

const Following = styled.div`

    display: flex;
    flex-direction:row;
    margin-left: 50px;
    h1{
        color: grey;
        font-style:italic;
        margin-right: 10px;
        font-size: 13px;
    }


`

export default ImFollowButton;