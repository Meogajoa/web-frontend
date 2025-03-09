import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

const brand = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  variable: '--font-brand',
  weight: '100 900',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Meogajoa',
  description: 'Meogajoa - Who is the best liar?',
};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={brand.variable}>{children}</body>
    </html>
  );
};
export default RootLayout;
