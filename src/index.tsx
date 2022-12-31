import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { NeededConnector } from "utils/types"
import App from "./App"
import store from "./context/store"

window.Buffer = window.Buffer || require("buffer").Buffer

export const NEEDED_CONNECTOR: NeededConnector = [
  "injected",
  "walletconnect",
  "coinbase",
  "eip1193",
  "empty",
  "gnosisSafe",
  "url",
  "network",
]

export const NEEDED_CHAIN_ID = [1, 3, 4, 5, 42, 56, 97, 1337]

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
