import { User } from '@./common';
import { HTTPClient } from '@./fetcher';
import { AxiosRequestConfig } from 'axios';
import { makeTry } from 'make-try';

export class AuthService {
  constructor(private httpService: HTTPClient) {}
  async getUser(options?: undefined | AxiosRequestConfig) {
    const { err, result, hasError } = await makeTry(
      async () => await this.httpService.get<User>('/auth/user', options)
    )();

    if (hasError) {
      console.error('network error');
      return null;
    }

    return result.data;
  }
}
