import { formatEther } from "@ethersproject/units"
import { List, ListItem, Typography } from "@mui/material"
import useBalances from "../../hooks/useBalances"
import { getEllipsis } from "../../utils"

interface AccountsProps {
  accounts?: string[]
}

const Accounts: React.FC<AccountsProps> = ({ accounts }) => {
  const balances = useBalances(accounts)

  if (accounts === undefined) return null

  return (
    <Typography variant="body2" component="span">
      <List>
        {accounts.length === 0
          ? "None"
          : accounts?.map((account, i) => (
              <ListItem key={account}>
                {getEllipsis(account, 10)}
                {balances?.[i] ? ` (Ξ${formatEther(balances[i])})` : null}
              </ListItem>
            ))}
      </List>
    </Typography>
  )
}

export default Accounts
