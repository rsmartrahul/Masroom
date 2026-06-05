import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import '../globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { CartProvider } from '@/components/CartProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Business Hub - Mushroom Products & Solar Services',
  description:
    'Premium mushroom products, packaging solutions, and professional solar panel cleaning services. Sustainable business solutions for the modern world.',
  keywords: [
    'mushroom products',
    'dry mushrooms',
    'solar panel cleaning',
    'solar maintenance',
    'sustainable business',
    'eco-friendly products',
  ],
  authors: [{ name: 'Business Hub' }],
  creator: 'Business Hub',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://businesshub.vercel.app',
    title: 'Business Hub - Mushroom Products & Solar Services',
    description: 'Premium products and sustainable business solutions',
    siteName: 'Business Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Hub - Mushroom Products & Solar Services',
    description: 'Premium products and sustainable business solutions',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#1f56d5" />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
