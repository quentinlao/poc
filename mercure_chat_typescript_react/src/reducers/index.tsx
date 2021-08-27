import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';

export interface IRootState {
    auth: IAuth;
    message: any;
}
export interface IAuth {
    isLoggedIn: boolean;
    username: string;
    email: string;
    roles: [];
}
export default combineReducers({
    auth,
});
