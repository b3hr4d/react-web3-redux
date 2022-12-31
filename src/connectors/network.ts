import { Network } from "@web3-react/network"
import { Actions } from "@web3-react/types"
import { URLS } from "utils/chains"

const network = (actions: Actions) =>
  new Network({
    actions,
    urlMap: URLS,
    defaultChainId: 1,
  })

export default network
