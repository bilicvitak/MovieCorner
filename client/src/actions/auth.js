import * as api from '../api';
import { AUTH, LOGOUT, TOKEN } from '../constants/actionTypes';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        navigate('/');

    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const logout = (token, navigate) => async (dispatch) => {
    try {
        await api.logout(token);

        dispatch({ type: LOGOUT });

        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const getNewToken = (refreshToken) => async(dispatch) => {
    try {
        const { data } = await api.getNewToken(refreshToken);

        dispatch({ type: TOKEN, data });
    } catch (error){
        console.log(error);
    }
}