// import * as api from '../../Api/user';
import { userActions } from '../Reducers/user';

export const fetchChats = () => {
    return async dispatch => {
        try {
            const data = []
            // const { data } = await api.getChats();
            dispatch(
                userActions.FETCH_CHATS(data)
            );
        } catch (error) {
            console.log(error)
        }
    }
}

export const login = (response) => {
    return async dispatch => {
        try {
            localStorage.setItem('auth_token', JSON.stringify(response.token));
            localStorage.setItem('role', JSON.stringify(response.user.role));
            localStorage.setItem('user', JSON.stringify(response.user));
            dispatch(userActions.CHANGE_LOGIN(true));
            dispatch(userActions.UPDATE_USER(response.user));
        } catch (error) {
            console.log(error)
        }
    }
}

export const signup = (response) => {
    return async dispatch => {
        try {
            localStorage.setItem('auth_token', JSON.stringify(response.token));
            localStorage.setItem('role', JSON.stringify(response.user.role));
            localStorage.setItem('user', JSON.stringify(response.user));
            dispatch(userActions.CHANGE_LOGIN(true));
            dispatch(userActions.UPDATE_USER(response.user));
        } catch (error) {
            console.log(error)
        }
    }
}


export const signout = () => {
    return async dispatch => {
        try {
            localStorage.removeItem("chat-app-user");
            dispatch(userActions.CHANGE_LOGIN(false));
        } catch (error) {
            console.log(error)
        }
    }
}

export const isSignin = () => {
    console.log("aasa", localStorage.getItem('auth_token'));
    console.log(localStorage.getItem('user'))
    return async dispatch => {
        localStorage.getItem('auth_token') ? dispatch(userActions.CHANGE_LOGIN(true)) : dispatch(userActions.CHANGE_LOGIN(false));
        localStorage.getItem('user') && dispatch(userActions.UPDATE_USER(JSON.parse(localStorage.getItem('user'))));
    }
}

export const updateFav = (id, isAdding) => {
    return async dispatch => {
        if (isAdding) {
            dispatch(userActions.ADD_FAV(id));
        } else {
            dispatch(userActions.REMOVE_FAV(id));
        }
    }
}

export const addAllProducts = (products) => {
    return async dispatch => {
        dispatch(userActions.ADD_ALL_PRODUCTS(products))
    }
}



export const deleteSingleProduct = (product) => {
    return async dispatch => {

        dispatch(userActions.DELETE_PRODUCT(product.id))
    }
}


export const editSingleProduct = (product) => {
    return async dispatch => {

        dispatch(userActions.EDIT_PRODUCT(product))
    }
}


export const changeDealStatus = (status) => {
    return async dispatch => {

        dispatch(userActions.CHANGE_DEAL_STATUS(status))
    }
}


