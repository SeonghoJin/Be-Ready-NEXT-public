import Head from 'next/head';
import { useEffect } from 'react';
import { MetaData } from './metata';

const SEO = () => {
  useEffect(() => {
    document.documentElement.lang = 'kr';
  }, []);

  return (
    <Head>
      <title>{MetaData.title}</title>
      <meta name="application-name" content="PWA App" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Be Ready NEXT" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge"></meta>
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="icon" type="image/png" sizes="32x32" href="/logo/32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/logo/16x16.png" />
      <link rel="mask-icon" href="/logo/mask_logo.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <meta
        httpEquiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      ></meta>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      ></meta>
      <link rel="manifest" href="/manifest.json"></link>
      <link
        href="/favicon.ico"
        rel="icon"
        type="image/png"
        sizes="16x16"
      ></link>
      <link rel="apple-touch-icon" sizes="48x48" href="/logo/48x48.png"></link>
      <link rel="apple-touch-icon" sizes="64x64" href="/logo/64x64.png"></link>
      <link
        rel="apple-touch-icon"
        sizes="128x128"
        href="/logo/128x128.png"
      ></link>
      <link
        rel="apple-touch-icon"
        sizes="256x256"
        href="/logo/256x256.png"
      ></link>
      <meta name="keywords" content={MetaData.keywords}></meta>
      <meta name="description" content={MetaData.description} />
      <meta name="author" content={MetaData.author.name} />
      <meta property="og:title" content={MetaData.title} />
      <meta property="og:description" content={MetaData.description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Be Ready NEXT" />
      <meta property="og:url" content="https://be-ready-next.vercel.app/" />
      <meta name="theme-color" content="#000000" />
      <meta
        property="og:image"
        content="https://be-ready-next.vercel.app/logo/128x128.png"
      />
      <meta
        name="naver-site-verification"
        content="2842aacdd0711bffa56913595cb7fbc6ebed0993"
      />
    </Head>
  );
};

export default SEO;
