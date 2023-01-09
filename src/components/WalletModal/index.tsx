import {
  Box,
  Card,
  CircularProgress,
  Container,
  Divider,
  Modal,
  Stack,
} from "@mui/material"
import { useConnectorKeys, useInitialized } from "contexts/hooks/useWeb3"

import WalletCard from "./WalletCard"

interface WalletModalProps {
  open: boolean
  onClose: (open: boolean) => void
}

const WalletModal: React.FC<WalletModalProps> = ({ open, onClose }) => {
  const initialized = useInitialized()

  const connectorKeys = useConnectorKeys()

  return (
    <Modal open={open} onClose={() => onClose(false)} disableEnforceFocus>
      <Container maxWidth="xs" disableGutters>
        <Box m={{ xs: 0, sm: "10% auto" }}>
          <Card>
            <Box maxHeight="90vh" overflow="auto">
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
      </Container>
    </Modal>
  )
}

export default WalletModal
