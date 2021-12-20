import axios from 'axios';

const url = 'http://localhost:8001';
axios.defaults.baseURL = url;

axios.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const signIn = (formData) => axios.post(`/users/signin`, formData);
export const signUp = (formData) => axios.post(`/users/signup`, formData);