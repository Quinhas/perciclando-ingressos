import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Perciclando',
  description: 'Perciclando',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-br'>
      <body className={poppins.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
        >
          {children}
        </ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
