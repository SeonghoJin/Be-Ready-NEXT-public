import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import '../sass/app.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import { ApiServiceContextProvider } from '../context/ApiServiceContext';
import NProgress from 'nprogress';
import React from 'react';
import Router from 'next/router';
import 'nprogress/nprogress.css';
import SEO from '../components/SeoHeader';
import UnsafeToastContainer from '../components/Toast/ToastContainer';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function CustomApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteDone);
    Router.events.on('routeChangeError', handleRouteDone);

    return () => {
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteDone);
      Router.events.off('routeChangeError', handleRouteDone);
    };
  }, []);

  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RecoilRoot>
        <ApiServiceContextProvider>
          <SEO />
          <main className="app">
            <Component {...pageProps} />
          </main>
          <UnsafeToastContainer />
        </ApiServiceContextProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default CustomApp;
