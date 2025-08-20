import type { AppProps } from 'next/app'

import { globalStyles } from '../styles.index'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
