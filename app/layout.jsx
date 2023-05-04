import {Suspense} from 'react';
import Header from './components/Header';
import AuthProvider from './contexts/auth.context';
import './globals.css'
import LoadingPage from './loader';

export const metadata = {
  title: 'AWS Cognito Task',
  description: 'AWS Cognito Identity Pools and  ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <AuthProvider>
          <Header />
          <main>
            <Suspense fallback={<LoadingPage/>}>
              {children}
            </Suspense>
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}