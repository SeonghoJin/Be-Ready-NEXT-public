import { ApiServiceImpl } from '../service/ApiService/ApiServiceImpl';
import { createContext, PropsWithChildren, useContext } from 'react';
import { ArticleService } from '../service/ArticleService/ArticleService';
import { articleHttpService } from '../service/HttpService';
import { AuthService } from '../service/AuthService';

export const apiServiceImpl = new ApiServiceImpl(articleHttpService);
export const articleService = new ArticleService(articleHttpService);
export const authService = new AuthService(articleHttpService);

const defaultValue = {
  apiService: apiServiceImpl,
  articleService: new ArticleService(articleHttpService),
};

export const ApiServiceContext = createContext(defaultValue);

export const useApiService = () => {
  return useContext(ApiServiceContext);
};

export const ApiServiceContextProvider = ({
  children,
}: // eslint-disable-next-line @typescript-eslint/ban-types
PropsWithChildren<{}>) => {
  return (
    <ApiServiceContext.Provider value={defaultValue}>
      {children}
    </ApiServiceContext.Provider>
  );
};
