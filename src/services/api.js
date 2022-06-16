import axios from "axios";

const BASE_URL = 'http://localhost:4000';

function getHashtags(){
    const promise = axios.get(`${BASE_URL}/hashtag`);
    return promise;
}

const api = { getHashtags };

export default api;