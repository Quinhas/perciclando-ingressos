import theme from '@/styles/chakra-theme';
import { ColorModeScript } from '@chakra-ui/react';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='shortcut icon'
          href='/favicon.ico'
        />
      </Head>
      <body>
        <Main />
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <NextScript />
      </body>
    </Html>
  );
}
