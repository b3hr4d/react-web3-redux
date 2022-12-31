import { usePriorityWeb3 } from "context/hooks/useWeb3"

export function useAccounts(): string[] | undefined {
  const web3 = usePriorityWeb3()
  return web3?.accounts
}

export function useAccount(): string | undefined {
  return useAccounts()?.[0]
}
