import '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import Layout from '../components/layout'
import { CookiesProvider } from 'react-cookie'
export default function App({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <Layout>
          <link rel="icon" href="/static/favicon.ico" />
          <link rel="icon" href="data:;base64,=" />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </CookiesProvider>
  )
}
