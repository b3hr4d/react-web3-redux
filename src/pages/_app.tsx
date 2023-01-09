import Header from "layouts/Header"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import store from "../contexts/store"
import "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  )
}
