import axios from 'axios';


export const url = process.env.NODE_ENV === 'development' && 'http://localhost:8000';

export const axiosSignin = async (formData) => await axios.post(`${url}/api/auth/login`, formData);
export const axiosSignup = async (formData) => await axios.post(`${url}/api/auth/signup`, formData);
export const axiosGetAllProducts = async (formData) => await axios.get(`${url}/api/products`);
export const axiosAddFav = async (formData) => await axios.post(`${url}/api/auth/wishlist/update`, formData);
export const axiosAddProduct = async (formData) => await axios({
    url: `${url}/api/products/register`,
    data: formData,
    method: 'post',
    headers: { "Content-Type": "multipart/form-data" },
});












export const axiosSetAvatarRoute = async (id, formData) => await axios.post(`${url}/api/auth/setAvatar/${id}`, formData);
export const allUsers = (id) => axios.get(`${url}/api/auth/allUsers/${id}`);
export const getChats = () => axios.get(`${url}/chats`);
export const getChat = () => axios.get(`${url}/chats/:id`);




export const fetchApiSignup = (data) => fetch(`${url}/auth/register`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data)
})

export const fetchApiSignin = (data) => fetch(`${url}/auth/login`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data)
})

export const fetchApiSetAvatarRoute = (id, data) => fetch(`${url}/auth/setAvatar/${id}`, {
    // headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: data
})