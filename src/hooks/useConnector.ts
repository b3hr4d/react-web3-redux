import { getIsActive } from "contexts/actions/web3"
import { useConnectorKeys, useConnectorStates } from "contexts/hooks/useWeb3"
import { connectorCache } from "contexts/models/web3"
import { Web3ContextType } from "contexts/types/web3"
import { ConnectorName, ConnectorType } from "utils/types"
import { useProvider } from "./useProvider"

export const getConnector = (key: ConnectorName) => {
  return connectorCache[key] as ConnectorType
}

export const useConnectorByName = (
  key: ConnectorName
): Partial<Web3ContextType> => {
  const connector = getConnector(key)
  const isActive = getIsActive(key)

  const states = useConnectorStates(key)
  const provider = useProvider(key, !!states?.accounts?.length)

  const signer = provider?.getSigner()

  return { connector, signer, isActive, provider, ...states }
}

export function useActiveConnectorsKey() {
  const web3 = useConnectorKeys()
  return web3.find(getIsActive) as ConnectorName
}

const useConnector = () => {
  const key = useActiveConnectorsKey()

  return useConnectorByName(key)
}

export default useConnector
