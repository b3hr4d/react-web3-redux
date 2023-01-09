import {
  connectorActivate,
  connectorAddChain,
  connectorDisconnect,
  connectorSwitchChain,
  useConnectorWithKey,
} from "contexts/hooks/useWeb3"
import { NEEDED_CHAIN_ID } from "pages"
import { useMemo, useState } from "react"
import { ConnectorName } from "utils/types"
import ChainSelect from "./ChainSelect"

interface ConnectorButtonProps {
  title: string
  color: "success" | "error" | "warning" | "info" | "secondary" | "primary"
  onClick: () => void
}
interface ConnectWithSelectProps {
  connectorName: ConnectorName
  isActivating: boolean
  isActive: boolean
}

const ConnectWithSelect: React.FC<ConnectWithSelectProps> = ({
  connectorName,
  isActivating,
  isActive,
}) => {
  const web3 = useConnectorWithKey(connectorName)

  const [desiredChainId, setDesiredChainId] = useState(web3?.chainId || 1)

  const needSwitch =
    web3?.chainId !== undefined && web3?.chainId !== desiredChainId

  function onChange(event: any) {
    setDesiredChainId(event.target.value)
    if (web3?.error?.code || !isActive)
      connectorSwitchChain(connectorName, event.target.value)
  }

  const buttonProps: ConnectorButtonProps = useMemo(() => {
    if (web3?.error?.code === 4902) {
      return {
        title: "Add Chain",
        color: "warning",
        onClick: () => connectorAddChain(connectorName, desiredChainId),
      }
    }
    if (web3?.error) {
      return {
        title: "Try Again?",
        color: "info",
        onClick: () => connectorActivate(connectorName, desiredChainId),
      }
    }
    if (needSwitch) {
      return {
        title: "Switch Chain",
        color: "secondary",
        onClick: () => connectorSwitchChain(connectorName, desiredChainId),
      }
    }
    if (isActive) {
      return {
        title: "Disconnect",
        color: "error",
        onClick: () => connectorDisconnect(connectorName),
      }
    }
    return {
      title: "Connect",
      color: "success",
      onClick: () => connectorActivate(connectorName, desiredChainId),
    }
  }, [connectorName, desiredChainId, isActive, needSwitch, web3?.error])

  return (
    <ChainSelect
      connectorName={connectorName}
      chainId={desiredChainId}
      loading={isActivating}
      onChange={onChange}
      chainIds={NEEDED_CHAIN_ID}
      {...buttonProps}
    />
  )
}

export default ConnectWithSelect
