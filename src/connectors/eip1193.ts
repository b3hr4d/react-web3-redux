import { Eip1193Bridge } from "@ethersproject/experimental"
import { JsonRpcProvider } from "@ethersproject/providers"
import { EIP1193 } from "@web3-react/eip1193"
import { Actions } from "@web3-react/types"
import { URLS } from "../utils/chains"

class Eip1193BridgeWithoutAccounts extends Eip1193Bridge {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request(request: { method: string; params?: any[] }): Promise<any> {
    if (
      request.method === "eth_requestAccounts" ||
      request.method === "eth_accounts"
    )
      return Promise.resolve([])
    return super.request(request)
  }
}

const ethersProvider = new JsonRpcProvider(URLS[1][0], 1)

const eip1193Provider = new Eip1193BridgeWithoutAccounts(
  ethersProvider.getSigner(),
  ethersProvider
)

const eip1193 = (actions: Actions) =>
  new EIP1193({ actions, provider: eip1193Provider })

export default eip1193
