import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://share-filesy-backend.onrender.com/',
});

export default instance;
