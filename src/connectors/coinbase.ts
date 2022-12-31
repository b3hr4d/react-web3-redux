import { CoinbaseWallet } from "@web3-react/coinbase-wallet"
import { Actions } from "@web3-react/types"
import { URLS } from "../utils/chains"

const coinbase = (actions: Actions) =>
  new CoinbaseWallet({
    actions,
    options: {
      url: URLS[1][0],
      appName: "hivpn",
    },
  })

export default coinbase
