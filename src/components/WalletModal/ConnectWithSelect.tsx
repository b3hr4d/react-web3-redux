import { Network } from "@web3-react/network"
import { ProviderRpcError } from "@web3-react/types"
import { WalletConnect } from "@web3-react/walletconnect"
import { getConnector } from "hooks/useConnector"
import { useCallback, useEffect } from "react"
import { ConnectorName } from "utils/types"
import useChainSwitch from "../../hooks/useChainSwitch"
import { CHAINS, getAddChainParameters, URLS } from "../../utils/chains"
import ChainSelect from "./ChainSelect"

interface ConnectWithSelectProps {
  connectorName: ConnectorName
  isActivating: boolean
  isActive: boolean
  error: ProviderRpcError | undefined
  setError: (error: ProviderRpcError | undefined) => void
}

const ConnectWithSelect: React.FC<ConnectWithSelectProps> = ({
  connectorName,
  isActivating,
  isActive,
  error,
  setError,
}) => {
  const connector = getConnector(connectorName)

  const isNetwork = connector instanceof Network
  const displayDefault = !isNetwork
  const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map(
    (chainId) => Number(chainId)
  )
  const { desiredChainId, switchChain } = useChainSwitch(connectorName)

  const connectHandler = useCallback(() => {
    if (!connector) return
    Promise.resolve(
      (async () => {
        if (connector instanceof WalletConnect || connector instanceof Network)
          await connector.activate(
            desiredChainId === -1 ? undefined : desiredChainId
          )
        else {
          await connector.activate(
            desiredChainId === -1
              ? undefined
              : getAddChainParameters(desiredChainId)
          )
        }
      })()
    )
      .then(() => setError(undefined))
      .catch(setError)
  }, [connector, desiredChainId, setError])

  const disconnectHandler = () => {
    setError(undefined)
    if (!connector) return

    if (connector.deactivate) {
      void connector.deactivate()
    } else {
      void connector.resetState()
    }
  }

  useEffect(() => {
    if (!connector) return

    connector.provider?.on("chainChanged", (error: Error) => {
      console.log(error)
    })

    return () => {}
  }, [connector])

  const addChain = useCallback(async () => {
    if (!connector) return
    const chain = getAddChainParameters(desiredChainId)
    console.log(chain)
    connector.provider?.request({
      method: "wallet_addEthereumChain",
      params: [chain],
    })
  }, [connector, desiredChainId])

  return (
    <ChainSelect
      connectorName={connectorName}
      title={
        error?.code
          ? "Add Chain"
          : error
          ? "Try Again?"
          : isActive
          ? "Disconnect"
          : "Connect"
      }
      onClick={
        error?.code ? addChain : isActive ? disconnectHandler : connectHandler
      }
      chainId={desiredChainId}
      loading={isActivating}
      switchChain={switchChain}
      displayDefault={displayDefault}
      chainIds={chainIds}
    />
  )
}

export default ConnectWithSelect
