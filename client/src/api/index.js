import axios from 'axios';

const url = 'http://localhost:8001';
axios.defaults.baseURL = url;

axios.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).accessToken}`;
    }

    return req;
});

export const signIn = (formData) => axios.post('/users/signin', formData);
export const signUp = (formData) => axios.post('/users/signup', formData);
export const logout = (token) => axios.post('/users/logout', token);
export const getNewToken = (refreshToken) => axios.post('/users/token', refreshToken);

export const getRandomMoviesByUser = (id) => axios.get(`/movies/random/${id}`);
export const getRandomMovies = () => axios.get('/movies/random');
export const getAllMovies = () => axios.get('/movies');
export const watchMovie = (id) => axios.patch(`/movies/watch/${id}`);
export const likeMovie = (id) => axios.patch(`/movies/like/${id}`);
export const dislikeMovie = (id) => axios.patch(`/movies/dislike/${id}`);