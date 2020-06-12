import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-86078.firebaseio.com',
});

export default instance;
