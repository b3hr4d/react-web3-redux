import { Web3ReactState } from "@web3-react/types"
import { NEEDED_CONNECTOR } from "index"
import { useSelector } from "react-redux"
import { ConnectorName } from "utils/types"
import store, { RootState } from "../store"

export const initializeConnectors = () => {
  const connectors = NEEDED_CONNECTOR.filter(
    (connector, index) => NEEDED_CONNECTOR.indexOf(connector) === index
  )

  store.dispatch.web3.initializeConnectors(connectors)
}

export const useWeb3WithKey = (key: ConnectorName) =>
  useSelector((state: RootState) => state.web3[key])

export const useChainIdWithKey = (key: ConnectorName) =>
  useWeb3WithKey(key)?.chainId

export const useAccountsWithKey = (key: ConnectorName) =>
  useWeb3WithKey(key)?.accounts

export const useIsActivatingWithKey = (key: ConnectorName) =>
  Boolean(useWeb3WithKey(key)?.activating)

export const getWeb3 = () => store.getState().web3

export const getChainIdWithKey = (key: ConnectorName) => getWeb3()[key]?.chainId

export const getAccountsWithKey = (key: ConnectorName) =>
  getWeb3()[key]?.accounts

export const getIsActivatingWithKey = (key: ConnectorName) =>
  Boolean(getWeb3()[key]?.activating)

export const getIsActive = (key: ConnectorName): boolean => {
  const chainId = getChainIdWithKey(key)
  const accounts = getAccountsWithKey(key)
  const activating = getIsActivatingWithKey(key)

  return computeIsActive({
    chainId,
    accounts,
    activating,
  })
}
export const useIsActive = (key: ConnectorName): boolean => {
  const chainId = useChainIdWithKey(key)
  const accounts = useAccountsWithKey(key)
  const activating = useIsActivatingWithKey(key)

  return computeIsActive({
    chainId,
    accounts,
    activating,
  })
}

function computeIsActive({ chainId, accounts, activating }: Web3ReactState) {
  return Boolean(chainId && accounts && !activating)
}

export const useWeb3Keys = () => {
  const web3 = useWeb3()
  return Object.keys(web3) as ConnectorName[]
}

export const usePriorityWeb3 = () => {
  const keys = useWeb3Keys()
  const key = keys.find(getIsActive) as ConnectorName
  return useWeb3WithKey(key)
}

const useWeb3 = () => useSelector((state: RootState) => state.web3)

export default useWeb3
