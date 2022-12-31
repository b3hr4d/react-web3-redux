import { GnosisSafe } from "@web3-react/gnosis-safe"
import { Actions } from "@web3-react/types"

const gnosisSafe = (actions: Actions) => new GnosisSafe({ actions })

export default gnosisSafe
