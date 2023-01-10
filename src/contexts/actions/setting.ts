import store from "../store"
import { SnackBarType, Translate } from "../types/settings"

export const setModal = (modal: boolean) =>
  store.dispatch.settings.SET_MODAL(modal)

export const setShowSnackbar = (snackbar: boolean) =>
  store.dispatch.settings.setShowSnackBar(snackbar)

export const setShowAddress = () => store.dispatch.settings.setShowAddress()

export const setShowDetails = () => store.dispatch.settings.setShowDetails()

export const setSnackbar = (props: SnackBarType) =>
  store.dispatch.settings.setSnackBar(props)

export const setTranslate = (translate: Translate) =>
  store.dispatch.settings.setTranslate(translate)
