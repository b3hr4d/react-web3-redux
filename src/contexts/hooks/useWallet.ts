import { useSelector } from "react-redux"
import { RootState } from "../store"

function useWallet() {
  return useSelector((state: RootState) => state.wallet)
}

export default useWallet
