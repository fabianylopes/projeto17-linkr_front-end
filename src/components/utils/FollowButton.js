import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import swal from "sweetalert";
import api from "../utils/api/api.js";
import TokenContext from "./context/TokenContext.js";

export default function FollowButton({imFollowing, setImFollowing, id:toUnfllw, tokenId}) {

    const { token } = useContext(TokenContext);
    const { id:userid, token:localToken } = token;
    const [bttnIsActive, setBttIsActive] = useState({isTrue:true, firsTime:true})
    const [ sendAction, setSendAction ] = useState([]);

    useEffect(() => {
        
        const config = { headers:{Authorization: `Bearer ${localToken}`}};

        if(bttnIsActive.firsTime) setBttIsActive({...bttnIsActive, firsTime:false});
        else{
            if(bttnIsActive.isTrue){
                setBttIsActive({...bttnIsActive, isTrue:false});
                imFollowing
                ? (api.delete(`/unfollow/${userid}/${toUnfllw}`, config                                                                                                                                                 )
                    .then(res => {
                        setImFollowing(!imFollowing)
                        setBttIsActive({...bttnIsActive, isTrue:true});
                    })                  
                    .catch(erro=>{
                        swal('Unable to unfollow the user')
                        setBttIsActive({...bttnIsActive, isTrue:true});
                    })
                
                )

                :(api.post(`/follow/${userid}/${toUnfllw}`,null,config)
                    .then(res => {
                        setImFollowing(!imFollowing);
                        setBttIsActive({...bttnIsActive, isTrue:true});
                    })
                    .catch(erro=>{
                        swal('Unable to follow the user')
                        setBttIsActive({...bttnIsActive, isTrue:true});
                    })
                
                )
            }
        }
 
    }, [sendAction]) // eslint-disable-line react-hooks/exhaustive-deps

    if(imFollowing === null){
        return <Button disabled={false}>{<ThreeDots height={'10px'} color={'#FFF'} />}</Button>
        
    }
    else{
        return imFollowing
        ? <Button bckclr={imFollowing} onClick={()=> {setSendAction([...sendAction])}} >unfollow</Button>
        : <Button bckclr={imFollowing} onClick={()=> {setSendAction([...sendAction])}}>follow</Button>
    }
}

const Button = styled.button`

    padding:5px;
    width: 112px;
    background-color: ${(props)=>props.bckclr ? '#FFFFFF':'#1877F2'};
    color: ${(props)=> props.bckclr ? '#1877F2':'#FFFFFF'};
    border-radius:5px;
    margin-top:10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    

    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;



`