import axios from 'axios'

const instance = axios.create({
    baseURL : 'http://localhost:8000/api',
    headers : {
        'Content-Type' : 'applicartion/json'
    }
})

const token = localStorage.getItem('auth_token');

instance.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';

export default instance;