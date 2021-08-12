import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_HOST + '/',
    headers: { Authorization: `Bearer UHqK1UPbf-pux9PlFjse4HNGCaLg3HjvFnoiuFS52OU` }
});

export default instance;