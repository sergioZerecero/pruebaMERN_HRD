import axios from 'axios';
const API_URI = import.meta.env.VITE_API_URI;


export const verifySession = (token) => (
  axios.get(`${API_URI}user/veryfyToken`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res).catch(err => err)
)

export const getPermissions = (token) => (
  axios.get(`${API_URI}user/permissions`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res).catch(err => err)
)

