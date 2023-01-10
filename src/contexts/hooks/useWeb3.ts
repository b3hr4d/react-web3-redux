import { computeIsActive, getIsActive } from "contexts/actions/web3"
import { useSelector } from "react-redux"
import { ConnectorName } from "utils/types"
import { RootState } from "../store"

export function useInitialized() {
  return useSelector((state: RootState) => state.web3.initialized)
}

export function useConnectorStates(key: ConnectorName) {
  return useSelector((state: RootState) => state.web3.connectors[key])
}

export function useChainIdWithKey(key: ConnectorName) {
  return useConnectorStates(key)?.chainId
}

export function useAccountsWithKey(key: ConnectorName) {
  return useConnectorStates(key)?.accounts
}

export function useIsActivatingWithKey(key: ConnectorName) {
  return Boolean(useConnectorStates(key)?.activating)
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

export function useConnectorKeys() {
  const web3 = useWeb3()
  return Object.keys(web3.connectors) as ConnectorName[]
}

export function usePriorityWeb3() {
  const keys = useConnectorKeys()
  const key = keys.find(getIsActive) as ConnectorName
  return useConnectorStates(key)
}

export default function useWeb3() {
  return useSelector((state: RootState) => state.web3)
}
