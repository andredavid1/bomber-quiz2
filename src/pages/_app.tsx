import type { AppProps } from 'next/app'
import { GlobalStyles } from '../styles/global'
import { ConfigProvider } from 'contexts/ConfigContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </ConfigProvider>
  )
}

export default MyApp
