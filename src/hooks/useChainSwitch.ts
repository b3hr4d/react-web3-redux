import { useCallback, useState } from "react"
import { ConnectorName } from "utils/types"
import { useConnectorByName } from "./useConnector"

const useChainSwitch = (key: ConnectorName, defaultChainId = 1) => {
  const { chainId, connector } = useConnectorByName(key)

  const [error, setError] = useState<Error>()

  const [desiredChainId, setDesiredChainId] = useState<number>(
    chainId || defaultChainId
  )

  const switchChain = useCallback(
    (desiredChainId: number) => {
      if (!connector) return
      setDesiredChainId(desiredChainId)
      // if we're already connected to the desired chain, return
      if (desiredChainId === chainId) {
        setError(undefined)
        return
      }

      // if they want to connect to the default chain and we're already connected, return
      if (desiredChainId === -1 && chainId !== undefined) {
        setError(undefined)
        return
      }
      connector.activate(desiredChainId === -1 ? undefined : desiredChainId)
    },
    [chainId, connector]
  )

  return {
    desiredChainId,
    chainId,
    error,
    switchChain,
  }
}

export default useChainSwitch
