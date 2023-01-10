import { RootState } from "contexts/store"
import { useSelector } from "react-redux"

function useSettings() {
  return useSelector((state: RootState) => state.settings)
}

export default useSettings
