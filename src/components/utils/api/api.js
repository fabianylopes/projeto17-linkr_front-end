import axios from "axios";

const api = axios.create({

    baseURL:"https://linkr-de.herokuapp.com"
    
});

export default api;