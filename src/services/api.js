import axios from "axios";

const BASE_URL = 'http://localhost:4000';

function getHashtags(){
    const promise = axios.get(`${BASE_URL}/hashtag`);
    return promise;
}

function getPosts(){
    const promise = axios.get(`${BASE_URL}/timeline`);
    return promise;
}

const api = { getHashtags, getPosts };

export default api;