import { AuthContextProvider } from '@/contexts/auth-context';
import theme from '@/styles/chakra-theme';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Perciclando</title>
        <meta
          property='og:title'
          content='My page title'
          key='title'
        />
      </Head>
      <ChakraProvider theme={theme}>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </ChakraProvider>
    </>
  );
}
