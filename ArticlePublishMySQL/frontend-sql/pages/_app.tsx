import { store } from '@/reduxlogic/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import Layout from '@/layout/Layout'
import CookiesProvider from 'react-cookie/cjs/CookiesProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </CookiesProvider>
  )
}
