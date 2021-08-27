import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/';

const getPublicContent = () => {
    return axios.get(API_URL);
};

const getMe = (username: string) => {
    return axios
        .get(`/user/${username}`, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};
const getUserBoard = () => {
    return axios.get(API_URL + 'conversations', {
        headers: authHeader(),
    });
};

export default {
    getPublicContent,
    getUserBoard,
    getMe,
};
