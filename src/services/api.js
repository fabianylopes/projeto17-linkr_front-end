import axios from "axios";

const BASE_URL = 'https://linkr-de.herokuapp.com';

function getConfig(token){
    return { headers: { Authorization: `Bearer ${token}` } };
}

function getHashtags(){
    const promise = axios.get(`${BASE_URL}/hashtag`);
    return promise;
}

function getHashtag(hashtag){
    const promise = axios.get(`${BASE_URL}/hashtag/${hashtag}`);
    return promise;
}

function getPosts(){
    const promise = axios.get(`${BASE_URL}/timeline`);
    return promise;
}

function getPostsByUserId(id, token) {
    const config = getConfig(token);
    const promise = axios.get(`${BASE_URL}/user/${id}`, config);
    return promise;
}

function postComment(token, postId, comment) {
    const config = getConfig(token);
    const body = {postId, comment}
    const promise = axios.post(`${BASE_URL}/comment`, body, config);
    return promise;
}

function getSearchedUsers( userId, username, token ) {
    const config = getConfig(token);
    const promise = axios.get(`${BASE_URL}/user/list/${userId}/${username}`, config);
    return promise;
}

function getPostsByHashtag(hash, token){
    const config = getConfig(token);
    const promise = axios.get(`${BASE_URL}/hashtag/${hash}`, config);
    return promise;
}

const api = { getHashtags, getHashtag, getPosts, getPostsByUserId, postComment, getPostsByHashtag, getSearchedUsers };

export default api;