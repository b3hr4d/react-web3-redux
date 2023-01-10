import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core"
import loadingPlugin, { ExtraModelsFromLoading } from "@rematch/loading"
import contract from "./models/contract"
import setting from "./models/setting"
import wallet from "./models/wallet"
import web3 from "./models/web3"

export type Store = typeof store

type FullModel = ExtraModelsFromLoading<RootModel>

export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel, FullModel>

export interface RootModel extends Models<RootModel> {
  web3: typeof web3
  wallet: typeof wallet
  contract: typeof contract
  setting: typeof setting
}

export const models: RootModel = {
  web3,
  wallet,
  setting,
  contract,
}

const store = init<RootModel, FullModel>({ models, plugins: [loadingPlugin()] })

export default store
