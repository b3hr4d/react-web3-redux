import { Button, ButtonProps, MenuItem, Stack, TextField } from "@mui/material"
import { CHAINS } from "utils/chains"
import { ConnectorName } from "utils/types"
interface ChainSelectProps extends ButtonProps {
  connectorName: ConnectorName
  title: string
  chainId?: number
  chainIds: number[]
  onClick?: () => void
  onChange?: (e: any) => void
  loading?: boolean
}

const ChainSelect: React.FC<ChainSelectProps> = ({
  connectorName,
  chainId,
  title,
  loading,
  chainIds,
  onChange,
  ...rest
}) => (
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
      onChange={onChange}
      disabled={loading}
      value={chainId}
    >
      {chainIds.map((chainId: any) => (
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

export default ChainSelect
