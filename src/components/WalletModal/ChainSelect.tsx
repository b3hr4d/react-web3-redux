import { Button, ButtonProps, MenuItem, Stack, TextField } from "@mui/material"
import { CHAINS, URLS } from "utils/chains"
import { ConnectorName } from "utils/types"

interface ChainSelectProps extends ButtonProps {
  connectorName: ConnectorName
  title: string
  chainId?: number
  switchChain: (chainId: number) => void | undefined
  onClick?: () => void
  displayDefault: boolean
  loading?: boolean
  chainIds: number[]
}

const ChainSelect: React.FC<ChainSelectProps> = ({
  connectorName,
  chainId,
  switchChain,
  displayDefault,
  title,
  chainIds,
  loading,
  ...rest
}) => {
  return (
    <Stack
      direction="row"
      width="100%"
      justifyContent="space-between"
      spacing={1}
      pt={1}
    >
      <TextField
        label="Select a chain"
        fullWidth
        select
        variant="outlined"
        size="small"
        onChange={(event) => {
          switchChain(Number(event.target.value))
        }}
        disabled={loading}
        value={chainId}
      >
        {Object.keys(URLS).map((chainId: any) => (
          <MenuItem key={chainId} value={chainId}>
            {CHAINS[chainId]?.name ?? chainId}
          </MenuItem>
        ))}
      </TextField>
      <Button fullWidth size="small" variant="outlined" {...rest}>
        {title}
      </Button>
    </Stack>
  )
}

export default ChainSelect
