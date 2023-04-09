import { AxiosInstance } from 'axios';

export type HTTPClient = Pick<AxiosInstance, 'get' | 'put' | 'post' | 'delete'>;
