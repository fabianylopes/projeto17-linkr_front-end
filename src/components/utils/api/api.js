import axios from "axios";

const api = axios.create({
    baseURL:"http://10.0.104:4000"
});

export default api;