import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import WalletModal from "components/WalletModal"
import { useState } from "react"

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [open, setOpen] = useState<boolean>(true)

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          fontWeight="bold"
          sx={{ flexGrow: 1 }}
        >
          B3PAY
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => setOpen(true)}
        >
          CONNECT
        </Button>
      </Toolbar>
      <WalletModal open={open} onClose={setOpen} />
    </AppBar>
  )
}

export default Header
