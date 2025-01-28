import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/ui/footer';
import { AuthButton } from '@/components/ui/auth-button';
import { Logo } from '@/components/ui/logo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PicShare - Share Your Moments',
  description: 'A modern platform for sharing and managing your images',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex justify-end">
              <AuthButton />
            </div>
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}