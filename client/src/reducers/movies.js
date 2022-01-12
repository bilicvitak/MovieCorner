import { DISLIKE, GET_ALL, GET_BY_GENRE, GET_BY_KEYWORD, GET_LATEST, GET_RANDOM, GET_TOP_RATED, LIKE, WATCH } from "../constants/actionTypes";

const moviesReducer = (movies = [], action) => {
    switch (action.type) {
        case GET_RANDOM:
        case GET_ALL:
        case GET_LATEST:
        case GET_TOP_RATED:
        case GET_BY_GENRE:
        case GET_BY_KEYWORD:
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