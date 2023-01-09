import { createModel } from "@rematch/core"
import { Network } from "@web3-react/network"
import { Actions, Web3ReactStateUpdate } from "@web3-react/types"
import { WalletConnect } from "@web3-react/walletconnect"
import { validateAccount, validateChainId } from "contexts/data/web3"
import { getAddChainParameters } from "utils/chains"
import { ConnectorName } from "utils/types"
import {
  ConnectorCache,
  ConnectorState,
  Nullifier,
  Web3ReactStateWithKey,
} from "../data/web3/types"
import { RootModel } from "../store"
// we save connectors here, because it is too big
// and causes performance issues when serializing
export const connectorCache: ConnectorCache = {}

const connectorStatus: ConnectorState = {
  chainId: undefined,
  accounts: [],
  activating: false,
  error: undefined,
}

type DefaultState = {
  initialized: boolean
  connectors: {
    [key in ConnectorName]?: ConnectorState
  }
}

type ConnectorWithChainId = {
  key: ConnectorName
  desiredChainId: number
}

type SwitchChainParams = {
  key: ConnectorName
  chainId?: number
  desiredChainId?: number
}

type ErrorPayload = {
  key: ConnectorName
  error: Error | undefined
}

const nullifier: Nullifier = {
  url: 0,
  empty: 0,
  eip1193: 0,
  network: 0,
  injected: 0,
  gnosisSafe: 0,
  coinbase: 0,
  walletconnect: 0,
}

const web3 = createModel<RootModel>()({
  state: {
    initialized: false,
    connectors: {},
  } as DefaultState,
  reducers: {
    ADD: (state, key: ConnectorName) => {
      return {
        ...state,
        connectors: {
          ...state.connectors,
          [key]: connectorStatus,
        },
      }
    },
    RESET: (state, key: ConnectorName) => {
      return {
        ...state,
        connectors: {
          ...state.connectors,
          [key]: connectorStatus,
        },
      }
    },
    UPDATE: (state, payload: Web3ReactStateWithKey) => {
      const { key } = payload
      // determine the next chainId and accounts
      const chainId = payload.chainId ?? state.connectors[key]!.chainId
      const accounts = payload.accounts ?? state.connectors[key]!.accounts
      // ensure that the activating flag is cleared when appropriate
      let activating = state.connectors[key]!.activating
      if (activating && chainId && accounts) activating = false

      return {
        ...state,
        connectors: {
          ...state.connectors,
          [key]: {
            error: undefined,
            chainId,
            accounts,
            activating,
          },
        },
      }
    },
    SET_INITIALIZED: (state, initialized: boolean) => {
      return { ...state, initialized }
    },
    START_ACTIVATION: (state, key: ConnectorName) => {
      return {
        ...state,
        connectors: {
          ...state.connectors,
          [key]: { ...state.connectors[key], activating: true },
        },
      }
    },
    STOP_ACTIVATION: (state, key: ConnectorName) => {
      return {
        ...state,
        connectors: {
          ...state.connectors,
          [key]: { ...state.connectors[key], activating: false },
        },
      }
    },
    SET_ERROR: (state, payload: ErrorPayload) => {
      const { key, error } = payload
      return {
        ...state,
        connectors: {
          ...state.connectors,
          [key]: { ...state.connectors[key], error },
        },
      }
    },
  },
  effects: (dispatch) => ({
    actions: (key: ConnectorName): Actions => ({
      startActivation: () => {
        const nullifierCached = ++nullifier[key]

        dispatch.web3.START_ACTIVATION(key)
        // return a function that cancels the activation iff nothing else has happened
        return () => {
          if (nullifier[key] === nullifierCached)
            dispatch.web3.STOP_ACTIVATION(key)
        }
      },
      update: (payload: Web3ReactStateUpdate) => {
        // validate chainId statically, independent of existing state
        if (payload.chainId !== undefined) {
          validateChainId(payload.chainId)
        }

        if (payload.accounts !== undefined) {
          for (let i = 0; i < payload.accounts.length; i++) {
            payload.accounts[i] = validateAccount(payload.accounts[i])
          }
        }

        nullifier[key]++
        dispatch.web3.UPDATE({ ...payload, key })
      },
      resetState: () => {
        nullifier[key]++
        dispatch.web3.RESET(key)
      },
    }),
    initializeConnectors: async (names: ConnectorName[]) => {
      console.log("initializing connectors")
      for await (const key of names) {
        nullifier[key] = 0

        const connectorFile = await import(`connectors/${key}`)
        const connector = connectorFile.default(dispatch.web3.actions(key))

        connectorCache[key] = connector

        dispatch.web3.ADD(key)

        try {
          console.log(`Attempting to connect eagerly to ${key}`)
          if (connector.connectEagerly) await connector.connectEagerly()
          else await connector.activate()
        } catch {
          console.debug(`Failed to connect eagerly to ${key}`)
        }
      }
      dispatch.web3.SET_INITIALIZED(true)
    },
    activate: async ({ key, desiredChainId }: ConnectorWithChainId) => {
      console.log(
        `Attempting to connect to ${key} on chainId ${desiredChainId}`
      )
      try {
        const connector = connectorCache[key]
        if (!connector) throw new Error(`Connector ${key} not found`)

        if (connector instanceof WalletConnect || connector instanceof Network)
          await connector.activate(
            desiredChainId === -1 ? undefined : desiredChainId
          )
        else {
          await connector.activate(
            desiredChainId === -1
              ? undefined
              : getAddChainParameters(desiredChainId)
          )
        }
      } catch (error: any) {
        dispatch.web3.SET_ERROR({ key, error })
      }
    },
    addChain: async ({ key, desiredChainId }: ConnectorWithChainId) => {
      console.log(
        `Attempting to connect to ${key} on chainId ${desiredChainId}`
      )
      try {
        const connector = connectorCache[key]
        if (!connector) throw new Error(`Connector ${key} not found`)
        const params = getAddChainParameters(desiredChainId)

        connector.provider?.request({
          method: "wallet_addEthereumChain",
          params: [{ ...params, chainId: `0x${desiredChainId.toString(16)}` }],
        })
      } catch (error: any) {
        dispatch.web3.SET_ERROR({ key, error })
      }
    },
    switchChain: async ({ key, desiredChainId }: SwitchChainParams, state) => {
      try {
        console.log(`Attempting to switch chain to ${desiredChainId}`)
        const connector = connectorCache[key]
        if (!connector) throw new Error(`Connector ${key} not found`)

        await connector.activate(
          desiredChainId === -1 ? undefined : desiredChainId
        )
        dispatch.web3.SET_ERROR({ key, error: undefined })
      } catch (error: any) {
        dispatch.web3.SET_ERROR({ key, error })
      }
    },
    disconnect: async (key: ConnectorName) => {
      console.log(`Attempting to disconnect from ${key}`)
      const connector = connectorCache[key]
      if (!connector) throw new Error(`Connector ${key} not found`)
      if (connector.deactivate) {
        void connector.deactivate()
      } else {
        void connector.resetState()
      }
    },
  }),
})

export default web3
