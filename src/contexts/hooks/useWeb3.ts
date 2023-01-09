import { Web3ReactState } from "@web3-react/types"
import { NEEDED_CONNECTOR } from "pages/index"
import { useSelector } from "react-redux"
import { ConnectorName } from "utils/types"
import store, { RootState } from "../store"

export function initializeConnectors() {
  const connectors = NEEDED_CONNECTOR.filter(
    (connector, index) => NEEDED_CONNECTOR.indexOf(connector) === index
  )

  store.dispatch.web3.initializeConnectors(connectors)
}

export function connectorActivate(key: ConnectorName, desiredChainId: number) {
  return store.dispatch.web3.activate({ key, desiredChainId })
}

export function connectorSwitchChain(
  key: ConnectorName,
  desiredChainId: number
) {
  return store.dispatch.web3.switchChain({ key, desiredChainId })
}

export function connectorAddChain(key: ConnectorName, desiredChainId: number) {
  return store.dispatch.web3.addChain({ key, desiredChainId })
}

export function connectorDisconnect(key: ConnectorName) {
  store.dispatch.web3.disconnect(key)
}

export function useInitialized() {
  return useSelector((state: RootState) => state.web3.initialized)
}

export function useConnectorWithKey(key: ConnectorName) {
  return useSelector((state: RootState) => state.web3.connectors[key])
}

export function useChainIdWithKey(key: ConnectorName) {
  return useConnectorWithKey(key)?.chainId
}

export function useAccountsWithKey(key: ConnectorName) {
  return useConnectorWithKey(key)?.accounts
}

export function useIsActivatingWithKey(key: ConnectorName) {
  return Boolean(useConnectorWithKey(key)?.activating)
}

export function getWeb3() {
  return store.getState().web3
}

export function getChainIdWithKey(key: ConnectorName) {
  return getWeb3().connectors[key]?.chainId
}

export function getAccountsWithKey(key: ConnectorName) {
  return getWeb3().connectors[key]?.accounts
}

export function getIsActivatingWithKey(key: ConnectorName) {
  return Boolean(getWeb3().connectors[key]?.activating)
}

export function getIsActive(key: ConnectorName) {
  const chainId = getChainIdWithKey(key)
  const accounts = getAccountsWithKey(key)
  const activating = getIsActivatingWithKey(key)

  return computeIsActive({
    chainId,
    accounts,
    activating,
  })
}
export function useIsActive(key: ConnectorName) {
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

export function useConnectorKeys() {
  const web3 = useWeb3()
  return Object.keys(web3.connectors) as ConnectorName[]
}

export function usePriorityWeb3() {
  const keys = useConnectorKeys()
  const key = keys.find(getIsActive) as ConnectorName
  return useConnectorWithKey(key)
}

export default function useWeb3() {
  return useSelector((state: RootState) => state.web3)
}
