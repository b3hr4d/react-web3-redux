import { Actions } from "@web3-react/types"
import { WalletConnect } from "@web3-react/walletconnect"
import { URLS } from "../utils/chains"

const walletconnect = (actions: Actions) =>
  new WalletConnect({
    actions,
    options: {
      rpc: URLS,
    },
  })

export default walletconnect
