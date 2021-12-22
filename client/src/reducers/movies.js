import { DISLIKE, GET_ALL, GET_RANDOM, LIKE, WATCH } from "../constants/actionTypes";

const moviesReducer = (movies = [], action) => {
    switch (action.type) {
        case GET_RANDOM:
        case GET_ALL:
            return action.payload;
        case WATCH:
        case LIKE:
        case DISLIKE:
            return movies.map((movie) => movie._id === action.payload._id ? action.payload : movie);
        default:
            return movies;
    }
}

export default moviesReducer;