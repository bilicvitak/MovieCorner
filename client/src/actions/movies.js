import * as api from '../api';
import { GET_RANDOM, GET_ALL, WATCH, LIKE, DISLIKE, GET_LATEST, GET_TOP_RATED, GET_BY_GENRE } from '../constants/actionTypes';

export const getAllMovies = () => async (dispatch) => {
    try {
        const { data } = await api.getAllMovies();

        dispatch({ type: GET_ALL, payload: data });
    } catch (error) {
        console.log(error.message)
    }
}

export const getLatestMovies = (id) => async (dispatch) => {
    try {
        const { data } = (id == null) ? await api.getLatestMovies() : await api.getLatestMoviesByUser();

        dispatch({ type: GET_LATEST, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const getTopRatedMovies = (id) => async (dispatch) => {
    try {
        const { data } = (id == null) ? await api.getTopRatedMovies() : await api.getTopRatedMoviesByUser();

        dispatch({ type: GET_TOP_RATED, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const getMoviesByGenre = (id) => async (dispatch) => {
    try {
        const { data } = (id == null) ? await api.getMoviesByGenre() : await api.getMoviesByGenreUser();

        dispatch({ type: GET_BY_GENRE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const getRandomMovies = (id) => async (dispatch) => {
    try {
        const { data } = (id == null) ? await api.getRandomMovies() : await api.getRandomMoviesByUser();

        dispatch({ type: GET_RANDOM, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const watchMovie = (id) => async (dispatch) => {
    try {
        const { data } = await api.watchMovie(id);

        dispatch({ type: WATCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const likeMovie = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeMovie(id);

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const dislikeMovie = (id) => async (dispatch) => {
    try {
        const { data } = await api.dislikeMovie(id);

        dispatch({ type: DISLIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}