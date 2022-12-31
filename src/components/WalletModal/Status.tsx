import { Typography } from "@mui/material"
import Chain from "./Chain"

interface StatusProps {
  isActivating: boolean
  isActive: boolean
  chainId?: number
  error?: Error
}

const Status: React.FC<StatusProps> = ({
  isActivating,
  isActive,
  chainId,
  error,
}) => {
  return (
    <Typography variant="overline" fontSize={10}>
      {error ? (
        <span>
          🔴 {error.name ?? "Error"}
          {error.message ? `: ${error.message}` : null}
        </span>
      ) : isActivating ? (
        "🟡 Connecting"
      ) : isActive ? (
        "🟢 Connected"
      ) : (
        "⚪️ Disconnected"
      )}
      <Chain chainId={chainId} />
    </Typography>
  )
}

export default Status
