import axios from 'axios';


export const url = process.env.NODE_ENV === 'development' && 'http://localhost:8000';

export const axiosSignin = async (formData) => await axios.post(`${url}/api/auth/login`, formData);
export const axiosSignup = async (formData) => await axios.post(`${url}/api/auth/signup`, formData);
export const axiosGetAllProducts = async (formData) => await axios.get(`${url}/api/products`);
export const axiosGetAllUsers = async () => await axios.get(`${url}/api/users`);
export const axiosAddFav = async (formData) => await axios.post(`${url}/api/auth/wishlist/update`, formData);
export const axiosReportUser = async (formData) => await axios.post(`${url}/api/auth/report`, formData);
export const axiosIsReport = async (formData) => await axios.post(`${url}/api/auth/getreport`, formData);
export const axiosReportAction = async (formData) => await axios.post(`${url}/api/auth/reportaction`, formData);
export const axiosAcceptProduct = async (productId, formData) => await axios.post(`${url}/api/products/bid/accept/${productId}`, formData);
export const axiosDeleteProduct = async (id) => await axios.delete(`${url}/api/products/delete/${id}`);
export const axiosDeleteFeedback = async (id) => await axios.delete(`${url}/api/products/feedback/delete/${id}`);
export const axiosEditFeedback = async (id, data) => await axios.post(`${url}/api/products/feedback/edit/${id}`, data);
export const axiosEnableChat = async (id, id2) => await axios.post(`${url}/api/auth/chat/enable/${id}`, id2);
export const axiosGetEnableChat = async (id, id2) => await axios.get(`${url}/api/auth/chat/enable/${id}`);
export const axiosGetAllChats = async (id, id2) => await axios.get(`${url}/api/auth/chats/`);
export const axiosSendMessage = async (id, id2) => await axios.post(`${url}/api/auth/chats/${id}`, id2);
export const axiosAddProduct = async (formData) => await axios({
    url: `${url}/api/products/register`,
    data: formData,
    method: 'post',
    headers: { "Content-Type": "multipart/form-data" },
});
export const axiosAddBid = async (formData, id) => await axios({
    url: `${url}/api/products/bid/${id}`,
    data: formData,
    method: 'post',
    headers: { "Content-Type": "multipart/form-data" },
});
export const axiosEditProduct = async (formData, id) => await axios({
    url: `${url}/api/products/edit/${id}`,
    data: formData,
    method: 'post',
    headers: { "Content-Type": "multipart/form-data" },
});




export const axiosPostFeedback = async (formData, id) => await axios.post(`${url}/api/products/feedback/${id}`, formData);
export const axiosGetAllFeedback = async () => await axios.get(`${url}/api/products/feedback`);














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