import { getAddress } from "@ethersproject/address"

export const MAX_SAFE_CHAIN_ID = 4503599627370476
export function validateChainId(chainId: number): void {
  if (
    !Number.isInteger(chainId) ||
    chainId <= 0 ||
    chainId > MAX_SAFE_CHAIN_ID
  ) {
    throw new Error(`Invalid chainId ${chainId}`)
  }
}

export function validateAccount(account: string): string {
  return getAddress(account)
}
