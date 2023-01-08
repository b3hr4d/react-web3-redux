import { useSelector } from "react-redux"
import { RootState } from "../store"

const useLoading = () => useSelector((state: RootState) => state.loading)

export const useGlobalLoading = () => useLoading().global

export const useModelsLoading = (item: keyof RootState["loading"]["models"]) =>
  useLoading().models[item]

export const useEffectsLoading = (
  item: keyof RootState["loading"]["effects"]
) => useLoading().effects[item]

export default useLoading
