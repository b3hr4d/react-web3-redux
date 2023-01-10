import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import LinearProgress from "@mui/material/LinearProgress"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import WalletModal from "components/WalletModal"
import { useGlobalLoading } from "contexts/hooks"
import useConnector from "hooks/useConnector"
import { useState } from "react"
import { getEllipsis } from "utils"

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [open, setOpen] = useState<boolean>(false)

  const web3Loading = useGlobalLoading()
  const { signer, accounts } = useConnector()

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Box flex={8} display="flex" alignItems="center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">B3PAY</Typography>
          </Box>
          <Box justifyContent="flex-end" flex={4} display="flex">
            {signer && accounts ? (
              <Button
                variant="text"
                color="inherit"
                onClick={() => setOpen(true)}
              >
                {getEllipsis(accounts[0])}
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => setOpen(true)}
              >
                CONNECT
              </Button>
            )}
          </Box>
        </Box>
      </Toolbar>
      <WalletModal open={open} onClose={setOpen} />
      {web3Loading && <LinearProgress />}
    </AppBar>
  )
}

export default Header
