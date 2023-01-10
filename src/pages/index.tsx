import { Box, Button, Card, Container, Stack, Typography } from "@mui/material"
import { initializeConnectors } from "contexts/actions/web3"
import useConnector from "hooks/useConnector"
import { useEffect } from "react"
import { NeededConnector } from "utils/types"

export const NEEDED_CONNECTOR: NeededConnector = [
  "injected",
  "walletconnect",
  "coinbase",
  "network",
]

export const NEEDED_CHAIN_ID = [1, 5, 56, 43114, 80001, 31337]

export default function Home() {
  useEffect(() => initializeConnectors(), [])

  const { signer, accounts } = useConnector()

  const testSignature = async () => {
    if (!signer) return
    const signature = signer.signMessage("test")
    console.log(signature)
  }

  const testTransaction = async () => {
    if (!signer) return
    const tx = signer.sendTransaction({
      to: "0x0000000000000000000000000000000000000000",
      data: "0x",
      value: 0,
    })
    console.log(tx)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <Card>
          <Box px={2} py={1}>
            {accounts && accounts.length > 0 ? (
              <Stack
                spacing={2}
                direction={{ xs: "column", md: "row" }}
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="body1">{accounts[0]}</Typography>
                <Stack direction="row" width="100%" spacing={2}>
                  <Button variant="outlined" fullWidth onClick={testSignature}>
                    Test Signature
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={testTransaction}
                  >
                    Test Transaction
                  </Button>
                </Stack>
              </Stack>
            ) : (
              <Typography variant="body1">No account connected</Typography>
            )}
          </Box>
        </Card>
      </Container>
    </Box>
  )
}
