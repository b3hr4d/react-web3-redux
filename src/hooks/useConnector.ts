import { Web3ContextType } from "contexts/data/web3/types"
import useWeb3, {
  getIsActive,
  getWeb3,
  useConnectorWithKey,
} from "contexts/hooks/useWeb3"
import { connectorCache } from "contexts/models/web3"
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

  const states = useConnectorWithKey(key)
  const provider = useProvider(key, !!states?.accounts?.length)

  const signer = provider?.getSigner()

  return { connector, signer, isActive, provider, ...states }
}

export const getWeb3Keys = () => {
  const web3 = getWeb3()
  return Object.keys(web3) as ConnectorName[]
}

export const useWeb3Keys = () => {
  const web3 = useWeb3()
  return Object.keys(web3) as ConnectorName[]
}

export function useActiveConnectorsKey() {
  const web3 = useWeb3Keys()
  return web3.find(getIsActive) as ConnectorName
}

const useConnector = () => {
  const key = useActiveConnectorsKey()

  return useConnectorByName(key)
}

export default useConnector
