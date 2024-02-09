import axios from 'axios';
const API_URI = import.meta.env.VITE_API_URI;

export const getCategories = (token) => (
  axios.get(`${API_URI}categories/`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res).catch(err => err)
)

export const saveCategory = (newCategory, token) => (
  axios.post(`${API_URI}categories/`, {
    description: newCategory.description,
    acceptText: newCategory.acceptText,
    acceptImage: newCategory.acceptImage,
    acceptVideos: newCategory.acceptVideos
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res).catch(err => err)
)


