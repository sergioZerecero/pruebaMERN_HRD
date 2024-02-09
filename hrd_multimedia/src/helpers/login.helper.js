import axios from 'axios';
const API_URI = import.meta.env.VITE_API_URI

export const signIn = (identify, password) => (
  axios.post(`${API_URI}user/signIn`, { identify, password })
    .then((response) => response).catch(err => err)
);

export const signUp = ({ userName, password, email }) => (
  axios.post(`${API_URI}user/`, { userName, password, email })
    .then((res) => res).catch(err => err)
)
