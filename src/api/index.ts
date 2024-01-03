import axios from 'axios';
import { SERVER_URL } from '../../env';

const api = axios.create({
  baseURL: SERVER_URL + '/api',
});

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default api;
