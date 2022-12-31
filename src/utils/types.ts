import type { Connector } from "@web3-react/types"
import type { Web3Connectors } from "connectors"

export type ConnectorName = keyof Web3Connectors

export type ConnectorArray = ConnectorName[]

export type NeededConnector = Array<ConnectorName>

export type ConnectorType = Web3Connectors[ConnectorName] | Connector

export type ConnectorDetails = ConnectorDetail[]

export type ConnectorDetail = {
  name: ConnectorName
  icon: string
  connector: ConnectorType
}

export type ConnectorDetailFunction<T extends ConnectorName> = {
  name: T
  icon: string
  connector: Web3Connectors[T]
}
