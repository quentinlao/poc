import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from './types';

import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

export const register = (
    username: string,
    email: string,
    password: string,
) => (dispatch: any) => {
    return AuthService.register(username, email, password).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        },
    );
};

export const login = (username: string, password: string) => (
    dispatch: any,
) => {
    return AuthService.login(username, password)
        .then(
            () => {
                return Promise.resolve();
            },
            (error) => {
                const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                dispatch({
                    type: LOGIN_FAIL,
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });

                return Promise.reject();
            },
        )
        .then(() => {
            UserService.getMe(username).then((response) => {
                console.log(
                    '🚀 ~ file: auth.tsx ~ line 87 ~ UserService.getMe ~ response',
                    response,
                );
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: { user: response },
                });
                return Promise.resolve();
            });
        });
};

export const logout = () => (dispatch: any) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};
