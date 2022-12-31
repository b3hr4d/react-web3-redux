import { Actions } from "@web3-react/types"
import { Url } from "@web3-react/url"
import { URLS } from "utils/chains"

const url = (actions: Actions) => new Url({ actions, url: URLS[1][0] })

export default url
