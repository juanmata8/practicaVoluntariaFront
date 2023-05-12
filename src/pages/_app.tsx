import '@/styles/globals.css'
import { clientCSR } from '@/utils/client'
import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <ApolloProvider  client={clientCSR}>
      <Component {...pageProps} />
  </ApolloProvider>
  
}
