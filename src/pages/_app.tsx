import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import ProtectedPage from '../components/ProtectedPage'
import { QueryClient, QueryClientProvider } from 'react-query'

export default function App({ Component, pageProps }: AppProps) {
  const client = new QueryClient()
  return <>
    <QueryClientProvider client={client}>
      <Script type="application/javascript" src="https://accounts.google.com/gsi/client" />
      <ProtectedPage>
        <Component {...pageProps} />
      </ProtectedPage>
    </QueryClientProvider>
  </>
}
