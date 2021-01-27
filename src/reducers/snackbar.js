import {
  SHOW_SUCCESS_SNACKBAR,
  HIDE_SUCCESS_SNACKBAR,
  SHOW_ERROR_SNACKBAR,
  HIDE_ERROR_SNACKBAR,
} from '../actions/snackbar'

const snackbar = (
  state = { showSuccess: false, showError: false, message: '' },
  action
) => {
  switch (action.type) {
    case SHOW_SUCCESS_SNACKBAR:
      return { ...state, showSuccess: true, message: action.message }
    case HIDE_SUCCESS_SNACKBAR:
      return { ...state, showSuccess: false }
    case SHOW_ERROR_SNACKBAR:
      return { ...state, showError: true, message: action.message }
    case HIDE_ERROR_SNACKBAR:
      return { ...state, showError: false }
    default:
      return state
  }
}

export default snackbar
