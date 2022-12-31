import { CoinbaseWallet } from "@web3-react/coinbase-wallet"
import { EIP1193 } from "@web3-react/eip1193"
import { Empty } from "@web3-react/empty"
import { GnosisSafe } from "@web3-react/gnosis-safe"
import { MetaMask } from "@web3-react/metamask"
import { Network } from "@web3-react/network"
import { Url } from "@web3-react/url"
import { WalletConnect } from "@web3-react/walletconnect"

// key should be the same as the file name
export type Web3Connectors = {
  url: Url
  empty: Empty
  eip1193: EIP1193
  network: Network
  injected: MetaMask
  gnosisSafe: GnosisSafe
  coinbase: CoinbaseWallet
  walletconnect: WalletConnect
}
