import Axios from 'axios';
import { FRONT_CONFIG } from '@./front-config';

export const articleHttpService = Axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  baseURL: FRONT_CONFIG.CORE_BASE_URL,
});
