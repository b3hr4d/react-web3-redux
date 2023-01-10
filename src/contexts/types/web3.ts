import type {
  BaseProvider,
  JsonRpcSigner,
  Web3Provider,
} from "@ethersproject/providers"
import type {
  Connector,
  Web3ReactState,
  Web3ReactStateUpdate,
} from "@web3-react/types"
import type {
  AbstractConnectorArguments,
  ConnectorUpdate,
} from "@web3-react/types6"
import type { EventEmitter } from "events"
import type { ConnectorName, ConnectorType } from "utils/types"

export declare abstract class AbstractConnector extends EventEmitter {
  readonly supportedChainIds?: number[]
  constructor({ supportedChainIds }?: AbstractConnectorArguments)
  abstract activate(): Promise<ConnectorUpdate>
  abstract getProvider(): Promise<any>
  abstract getChainId(): Promise<number | string>
  abstract getAccount(): Promise<null | string>
  abstract deactivate(): void
  protected emitUpdate(update: ConnectorUpdate): void
  protected emitError(error: Error): void
  protected emitDeactivate(): void
}

export type ConnectorWithKey = {
  connector: ConnectorType
  key: ConnectorName
}

export interface Web3ReactUpdateState {
  chainId: number
  accounts: string[]
  activating: boolean
}

export type Web3ReactStateWithKey = Web3ReactStateUpdate & {
  key: ConnectorName
}

export type Web3ReactStateWithConnector = Web3ReactStateWithKey & {
  connector: ConnectorName
}

export interface ConnectorState extends Web3ReactState {
  error: Error | undefined
}

export type ConnectorCache = {
  [key in ConnectorName]?: ConnectorType
}

export type Nullifier = {
  [key in ConnectorName]: number
}

/**
 * @typeParam T - A type argument must only be provided if one or more of the connectors passed to Web3ReactProvider
 * is using `connector.customProvider`, in which case it must match every possible type of this
 * property, over all connectors.
 */
export type Web3ContextType<T extends BaseProvider = Web3Provider> = {
  connector: Connector
  chainId: number | undefined
  accounts: string[] | undefined
  activating: boolean
  isActive: boolean
  provider: T | undefined
  signer: JsonRpcSigner | undefined
}

export type DefaultState = {
  initialized: boolean
  connectors: {
    [key in ConnectorName]?: ConnectorState
  }
}

export type ConnectorWithChainId = {
  key: ConnectorName
  desiredChainId: number
}

export type SwitchChainParams = {
  key: ConnectorName
  chainId?: number
  desiredChainId?: number
}

export type ErrorPayload = {
  key: ConnectorName
  error: Error | undefined
}
