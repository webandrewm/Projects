import '../styles/globals.css'
import { SSRProvider } from '@react-aria/ssr'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import Layout from '../Layouts/Layout'
export default function App({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SSRProvider>
  )
}
