import { combineReducers } from 'redux';
import loggedUser from './loggedUser/loggedUser';

// Deklaracja użycia wybranego reducera
export default combineReducers ({
    isLogin: loggedUser
})
