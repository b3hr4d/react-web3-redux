import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CircularProgress from "@mui/material/CircularProgress"
import Divider from "@mui/material/Divider"
import Fade from "@mui/material/Fade"
import Modal from "@mui/material/Modal"
import Slide from "@mui/material/Slide"
import Stack from "@mui/material/Stack"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useConnectorKeys, useInitialized } from "contexts/hooks/useWeb3"
import WalletCard from "./WalletCard"

interface WalletModalProps {
  open: boolean
  onClose: (open: boolean) => void
}

const WalletModal: React.FC<WalletModalProps> = ({ open, onClose }) => {
  const matches = useMediaQuery("(min-width:600px)")

  const initialized = useInitialized()

  const connectorKeys = useConnectorKeys()

  return (
    <Modal
      open={open}
      onClose={() => onClose(false)}
      closeAfterTransition
      disableEnforceFocus
      keepMounted
      sx={{
        top: {
          xs: "inherit",
          sm: 0,
        },
      }}
    >
      <Box
        component={matches ? Fade : Slide}
        in={open}
        direction="up"
        margin={{ xs: 0, sm: "10% auto" }}
        maxWidth={{ xs: "100%", sm: 440 }}
      >
        <Card>
          <Box
            overflow="auto"
            sx={{
              maxHeight: {
                xs: "50vh",
                sm: "80vh",
              },
            }}
          >
            {!initialized ? (
              <Stack justifyContent="center" alignItems="center" height={300}>
                <CircularProgress />
              </Stack>
            ) : (
              <Stack
                spacing={2}
                justifyContent="space-between"
                divider={<Divider flexItem />}
              >
                {connectorKeys.map((connector) => (
                  <WalletCard key={connector} name={connector} />
                ))}
              </Stack>
            )}
          </Box>
        </Card>
      </Box>
    </Modal>
  )
}

export default WalletModal
