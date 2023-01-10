import { useSelector } from "react-redux"
import { RootState } from "../store"

export function useTransaction() {
  return useContract().contract?.transaction
}

export function useProvider() {
  return useContract().contract?.provider
}

export function useSigner() {
  return useContract().contract?.signer
}

function useContract() {
  return useSelector((state: RootState) => state.contract)
}

export default useContract
