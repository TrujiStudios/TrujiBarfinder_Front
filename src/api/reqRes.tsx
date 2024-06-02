import axios from 'axios';

export const reqResApi = axios.create({
    baseURL: 'http://localhost:5000/api/v1'
});

