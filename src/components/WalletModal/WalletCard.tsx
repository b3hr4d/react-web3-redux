import MoreVertIcon from "@mui/icons-material/MoreVert"
import SendIcon from "@mui/icons-material/Send"
import {
  Avatar,
  Box,
  CardHeader,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material"
import Menu from "@mui/material/Menu"
import { useState } from "react"
import { ConnectorName } from "utils/types"
import {
  useAccountsWithKey,
  useChainIdWithKey,
  useIsActivatingWithKey,
  useIsActive,
} from "../../contexts/hooks/useWeb3"
import Accounts from "./Accounts"
import ConnectWithSelect from "./ConnectWithSelect"
import Status from "./Status"

interface WalletCardProps {
  name: ConnectorName
}

const WalletCard: React.FC<WalletCardProps> = ({ name }) => {
  const chainId = useChainIdWithKey(name)
  const accounts = useAccountsWithKey(name)
  const isActivating = useIsActivatingWithKey(name)

  const isActive = useIsActive(name)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const openMenu = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <CardHeader
        sx={{
          pb: 0,
        }}
        avatar={
          <Avatar
            variant="square"
            alt={name}
            src={`assets/wallet/${name}.svg`}
          />
        }
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        titleTypographyProps={{
          textTransform: "capitalize",
        }}
        subheader={
          <Status
            isActivating={isActivating}
            isActive={isActive}
            chainId={chainId}
          />
        }
      />
      <Menu
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        open={openMenu}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sent mail" />
        </MenuItem>
      </Menu>
      <Box p={2} pt={0}>
        <Accounts accounts={accounts} />
        <ConnectWithSelect
          connectorName={name}
          isActivating={isActivating}
          isActive={isActive}
        />
      </Box>
    </Box>
  )
}

export default WalletCard
