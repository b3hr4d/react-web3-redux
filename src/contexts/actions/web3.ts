import { Web3ReactState } from "@web3-react/types"
import store from "contexts/store"
import { NEEDED_CONNECTOR } from "pages"
import { ConnectorName } from "utils/types"

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

export function connectorRemove(key: ConnectorName) {
  store.dispatch.web3.REMOVE(key)
}

export function getWeb3() {
  return store.getState().web3
}

export function getWeb3Connectors() {
  return store.getState().web3.connectors
}

export function getWeb3Connector(key: ConnectorName) {
  return store.getState().web3.connectors[key]
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

export function computeIsActive({
  chainId,
  accounts,
  activating,
}: Web3ReactState) {
  return Boolean(chainId && accounts && !activating)
}
