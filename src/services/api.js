import axios from "axios";

const BASE_URL = 'http://localhost:4000';

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
    const config = {headers: { Authorization: `Bearer ${token}`}};
    const promise = axios.get(`${BASE_URL}/user/${id}`, config);
    return promise;
}

const api = { getHashtags, getHashtag, getPosts, getPostsByUserId };

export default api;