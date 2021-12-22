import * as api from '../api';
import { GET_RANDOM, GET_ALL, WATCH, LIKE, DISLIKE } from '../constants/actionTypes';

export const getRandomMovies = (id) => async (dispatch) => {
    try {
        const { data } = (id == null) ? await api.getRandomMovies() : await api.getRandomMoviesByUser(id);
        dispatch({ type: GET_RANDOM, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const getAllMovies = () => async (dispatch) => {
    try {
        const { data } = await api.getAllMovies();
        dispatch({ type: GET_ALL, payload: data });
    } catch (error) {
        console.log(error.message)
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