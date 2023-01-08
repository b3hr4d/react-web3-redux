import { createModel } from "@rematch/core"
import { Actions, Web3ReactStateUpdate } from "@web3-react/types"
import { validateAccount, validateChainId } from "context/data/web3"
import { ConnectorName } from "utils/types"
import {
  ConnectorCache,
  ConnectorState,
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
}

type DefaultState = {
  [key in ConnectorName]?: ConnectorState
}

const nullifier = {}

const web3 = createModel<RootModel>()({
  state: {} as DefaultState,
  reducers: {
    ADD: (state, key: ConnectorName) => {
      return { ...state, [key]: connectorStatus }
    },
    RESET: (state, key: ConnectorName) => {
      return { ...state, [key]: connectorStatus }
    },
    UPDATE: (state, payload: Web3ReactStateWithKey) => {
      const { key } = payload
      // determine the next chainId and accounts
      const chainId = payload.chainId ?? state[key]!.chainId
      const accounts = payload.accounts ?? state[key]!.accounts
      // ensure that the activating flag is cleared when appropriate
      let activating = state[key]!.activating
      if (activating && chainId && accounts) activating = false

      return {
        ...state,
        [key]: { ...state[key], chainId, accounts, activating },
      }
    },
    START_ACTIVATION: (state, key: ConnectorName) => {
      return { ...state, [key]: { ...state[key], activating: true } }
    },
    STOP_ACTIVATION: (state, key: ConnectorName) => {
      return { ...state, [key]: { ...state[key], activating: false } }
    },
  },
  effects: (dispatch) => ({
    initializeConnectors: async (names: ConnectorName[]) => {
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
    },
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
  }),
})

export default web3
