import { CarRegistrationProvider } from '@/context/CarRegistrationContext';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['variable'],
});

export const metadata = {
  title: 'Octa kalkulators | Alpha Insurance',
  description: 'Izvēlies izdevīgāko!',
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <CarRegistrationProvider>
        <body className={`${inter.variable} min-h-screen bg-background antialiased`}>
          <div className="mx-auto w-full max-w-5xl pb-40">{children}</div>
        </body>
      </CarRegistrationProvider>
    </html>
  );
}
