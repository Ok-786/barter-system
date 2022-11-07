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
        },
        DELETE_PRODUCT(state, action) {
            state.allProducts = state.allProducts.filter((value) => value.id !== action.payload)
        },
        EDIT_PRODUCT(state, action) {
            var objIndex = state.allProducts.findIndex((obj => obj.id == action.payload.id));
            state.allProducts[objIndex] = action.payload
        },
        CHANGE_DEAL_STATUS(state, action) {
            state.user.deal = action.payload;
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice; 