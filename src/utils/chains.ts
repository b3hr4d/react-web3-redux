interface AddEthereumChainParameter {
  chainId: number
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string // 2-6 characters long
    decimals: 18
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  iconUrls?: string[] // Currently ignored.
}

const ETH: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
}

const MATIC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
}

const CELO: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Celo",
  symbol: "CELO",
  decimals: 18,
}

const BNB: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Binance",
  symbol: "BNB",
  decimals: 18,
}

const AVAX: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Avalanche",
  symbol: "AVAX",
  decimals: 18,
}

interface BasicChainInformation {
  urls: string[]
  name: string
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"]
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"]
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency
}

export function getAddChainParameters(
  chainId: number
): AddEthereumChainParameter | undefined {
  const chainInformation = CHAINS[chainId]
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    }
  }
}

const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY
const quickNodeKey = process.env.NEXT_PUBLIC_QUICKNODE_KEY
const quickNodeTestKey = process.env.NEXT_PUBLIC_QUICKNODE_TEST_KEY

export const CHAINS: {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation
} = {
  1: {
    urls: [
      infuraKey ? `https://mainnet.infura.io/v3/${infuraKey}` : "",
      "https://cloudflare-eth.com",
    ].filter((url) => url !== ""),
    name: "Mainnet",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://etherscan.io"],
  },
  5: {
    urls: [infuraKey ? `https://goerli.infura.io/v3/${infuraKey}` : ""].filter(
      (url) => url !== ""
    ),
    name: "Görli",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://goerli.etherscan.io"],
  },
  42: {
    urls: [infuraKey ? `https://kovan.infura.io/v3/${infuraKey}` : ""].filter(
      (url) => url !== ""
    ),
    name: "Kovan",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://kovan.etherscan.io"],
  },
  // BinanceSmartChain
  56: {
    urls: [
      quickNodeKey
        ? `https://wider-intensive-tree.bsc.discover.quiknode.pro/${quickNodeKey}`
        : "https://bsc-dataseed.binance.org/",
    ].filter((url) => url !== ""),
    name: "SmartChain",
    nativeCurrency: BNB,
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
  97: {
    urls: [
      quickNodeTestKey
        ? `https://damp-solemn-lambo.bsc-testnet.discover.quiknode.pro/${quickNodeTestKey}`
        : "https://data-seed-prebsc-1-s1.binance.org:8545/",
    ].filter((url) => url !== ""),
    name: "SmartChain TestNet",
    nativeCurrency: BNB,
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
  // Optimism
  10: {
    urls: [
      infuraKey ? `https://optimism-mainnet.infura.io/v3/${infuraKey}` : "",
    ].filter((url) => url !== ""),
    name: "Optimism",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://optimistic.etherscan.io"],
  },
  69: {
    urls: [
      infuraKey ? `https://optimism-kovan.infura.io/v3/${infuraKey}` : "",
    ].filter((url) => url !== ""),
    name: "Optimism Kovan",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://kovan-optimistic.etherscan.io"],
  },
  43114: {
    urls: ["https://api.avax.network/ext/bc/C/rpc"].filter((url) => url !== ""),
    name: "Avalanche C-Chain",
    nativeCurrency: AVAX,
    blockExplorerUrls: ["https://snowtrace.io"],
  },
  // Arbitrum
  42161: {
    urls: [
      infuraKey ? `https://arbitrum-mainnet.infura.io/v3/${infuraKey}` : "",
    ].filter((url) => url !== ""),
    name: "Arbitrum One",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://arbiscan.io"],
  },
  421611: {
    urls: [
      infuraKey ? `https://arbitrum-rinkeby.infura.io/v3/${infuraKey}` : "",
    ].filter((url) => url !== ""),
    name: "Arbitrum Testnet",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://testnet.arbiscan.io"],
  },
  // Polygon
  137: {
    urls: [
      infuraKey ? `https://polygon-mainnet.infura.io/v3/${infuraKey}` : "",
      "https://polygon-rpc.com",
    ].filter((url) => url !== ""),
    name: "Polygon Mainnet",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  31337: {
    urls: ["http://localhost:8545"],
    name: "Localhost",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://app.tryethernal.com/"],
  },
  80001: {
    urls: [
      infuraKey ? `https://polygon-mumbai.infura.io/v3/${infuraKey}` : "",
    ].filter((url) => url !== ""),
    name: "Polygon Mumbai",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
  },
  // Celo
  42220: {
    urls: [`https://celo-mainnet.infura.io/v3/${infuraKey}`],
    name: "Celo",
    nativeCurrency: CELO,
    blockExplorerUrls: ["https://explorer.celo.org"],
  },
  44787: {
    urls: ["https://alfajores-forno.celo-testnet.org"],
    name: "Celo Alfajores",
    nativeCurrency: CELO,
    blockExplorerUrls: ["https://alfajores-blockscout.celo-testnet.org"],
  },
}

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs
  }

  return accumulator
}, {})
