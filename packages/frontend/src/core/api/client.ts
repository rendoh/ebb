import axios from 'axios';
import { getAuth } from 'firebase/auth';

/**
 * TODO:
 * 環境変数にする
 */
export const client = axios.create({
  baseURL: 'http://localhost:8080',
});

client.interceptors.request.use(async (config) => {
  const token = await getAuth().currentUser?.getIdToken();
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
