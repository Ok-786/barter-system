import { createSlice } from '@reduxjs/toolkit';

const initUserState = {
    products: [],
    login: false,
    user: {},
    allProducts: []
};

const userSlice = createSlice({
    name: 'user',
    initialState: initUserState,
    reducers: {
        FETCH_PRODUCTS(state, action) {
            state.products = action.payload;
        },
        CHANGE_LOGIN(state, action) {
            state.login = action.payload
        },
        UPDATE_USER(state, action) {
            state.user = action.payload
        },
        ADD_FAV(state, action) {

            state.user.wish_list.push(action.payload)
        },
        REMOVE_FAV(state, action) {
            var index = state.user.wish_list.indexOf(action.payload)
            state.user.wish_list.splice(index, 1)
        },
        ADD_ALL_PRODUCTS(state, action) {
            state.allProducts = action.payload
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice; 