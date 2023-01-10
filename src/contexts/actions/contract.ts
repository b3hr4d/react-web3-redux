import { Web3Provider } from "@ethersproject/providers"
import store from "../store"

export const setContract = (provider: Web3Provider, withSigner = false) =>
  store.dispatch.contract.init({ provider, withSigner })

export const unsetContract = () => store.dispatch.contract.UNSET()
