import {
  Box,
  Button,
  Card,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material"
import Header from "components/Header"
import { RootState } from "context/store"
import useConnector from "hooks/useConnector"
import { useSelector } from "react-redux"

function App() {
  const web3Loading = useSelector(
    (rootState: RootState) => rootState.loading.global
  )

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
      <Header />
      {web3Loading ? (
        <LinearProgress />
      ) : (
        <Container maxWidth="md" sx={{ mt: 2 }}>
          <Card>
            <Box px={2} py={1}>
              {accounts && accounts.length > 0 ? (
                <Stack
                  spacing={2}
                  direction={{ xs: "column", sm: "row" }}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography variant="body1">{accounts[0]}</Typography>
                  <Stack direction="row" width="100%" spacing={2}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={testSignature}
                    >
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
      )}
    </Box>
  )
}

export default App
