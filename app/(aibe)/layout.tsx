import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { cn } from '@/utils/cn';
import { Provider as TooltipProvider } from '@/components/ui/tooltip';
import { NotificationProvider } from '@/components/ui/notification-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ServiceWorkerRegister from '@/components/service-worker-register';
import CTA from '@/components/cta';
import { AuthProvider } from './_providers/Auth';
const inter = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const geistMono = localFont({
  src: './fonts/GeistMono[wght].woff2',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'AIBE - Italian-Brazilian Association of Economics',
  description: 'The Italian-Brazilian Association of Economics (AIBE) is a non-profit organization that promotes scientific cooperation between Italian and Brazilian economists.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={cn(inter.variable, geistMono.variable, 'antialiased')}
    >
      <body className='bg-bg-white-0 text-text-strong-950'>
        <AuthProvider
          // To toggle between the REST and GraphQL APIs,
          // change the `api` prop to either `rest` or `gql`
          api="rest" // change this to `gql` to use the GraphQL API
        >
          <ThemeProvider
            attribute='class'
            forcedTheme='light'
            defaultTheme='light'
            enableSystem={false}
          >
            <TooltipProvider>
              <div className='flex min-h-screen flex-col'>
                <Header />
                <main className='flex flex-1 flex-col lg:pt-[80px]'>{children}</main>
                <div className="relative mt-48 mobile:mt-48">
                  <CTA />
                </div>
                <Footer />
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </AuthProvider>

        <NotificationProvider />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
