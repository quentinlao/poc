import axios from 'axios';
import UserService from './user.service';
import base64 from 'base-64';
import authHeader from './auth-header';
import userService from './user.service';

const API_URL = 'http://localhost:8000/api/';
/* 
// Add a request interceptor
axios.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error)
    });
//Add a response interceptor

axios.interceptors.response.use((response) => {
    return response
 }, function (error) {
    const originalRequest = error.config;
 
    if (error.response.status === 401 && originalRequest.url === 
        API_URL) {
        return Promise.reject(error);
    }
 
    if (error.response.status === 401 && !originalRequest._retry) {
 
        originalRequest._retry = true;
        const refreshToken =                 localStorage.getItem(
            'refresh_token'        );

        return axios.post('/auth/token',
            {
                "refresh_token": refreshToken
            })
            .then(res => {
                if (res.status === 201) {
                    localStorageService.setToken(res.data);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
                    return axios(originalRequest);
                }
            })
    }
    return Promise.reject(error);
 }); */

const register = (
    username: string,
    email: string,
    password: string,
) => {
    return axios.post(API_URL + 'signup', {
        username,
        email,
        password,
    });
};

const login = (username: string, password: string) => {
    return axios({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'post',
        url: `/oauth/token?grant_type=password&username=${username}&password=${password}`,
        auth: {
            username: 'clientapp',
            password: '123456',
        },
        data: {},
    })
        .then((response) => {
            if (response.status === 200) {
                console.log(
                    '🚀 ~ file: auth.service.tsx ~ line 32 ~ login ~ response',
                    response.data,
                );
                sessionStorage.setItem(
                    'access_token',
                    response.data.access_token,
                );
                sessionStorage.setItem(
                    'expires_in',
                    response.data.expires_in,
                );
                localStorage.setItem(
                    'refresh_token',
                    response.data.refresh_token,
                );
            }
            return Promise.resolve();
        })
        .then(() => {
            userService.getMe(username).then((response) => {
                console.log(
                    '🚀 ~ file: auth.service.tsx ~ line 56 ~ userService.getMe ~ response',
                    response,
                );
                localStorage.setItem(
                    'user',
                    JSON.stringify(response),
                );
                return Promise.resolve();
            });
        });
};

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
};

export default {
    register,
    login,
    logout,
};
