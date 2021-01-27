export const SHOW_SUCCESS_SNACKBAR = 'SHOW_SUCCESS_SNACKBAR'
export const HIDE_SUCCESS_SNACKBAR = 'HIDE_SUCCESS_SNACKBAR'

export const SHOW_ERROR_SNACKBAR = 'SHOW_ERROR_SNACKBAR'
export const HIDE_ERROR_SNACKBAR = 'HIDE_ERROR_SNACKBAR'

export const showSuccessSnackBar = (message) => {
  return { type: SHOW_SUCCESS_SNACKBAR, message }
}

export const hideSuccessSnackBar = () => {
  return { type: HIDE_SUCCESS_SNACKBAR }
}

export const handleShowSuccessSnackBar = (message) => {
  return (dispatch) => {
    return dispatch(showSuccessSnackBar(message))
  }
}

export const handleHideSuccessSnackBar = () => {
  return (dispatch) => {
    return dispatch(hideSuccessSnackBar())
  }
}

export const showErrorSnackBar = (message) => {
  return { type: SHOW_ERROR_SNACKBAR, message }
}

export const hideErrorSnackBar = () => {
  return { type: HIDE_ERROR_SNACKBAR }
}

export const handleShowErrorSnackBar = (message) => {
  return (dispatch) => {
    return dispatch(showErrorSnackBar(message))
  }
}

export const handleHideErrorSnackBar = () => {
  return (dispatch) => {
    return dispatch(hideErrorSnackBar())
  }
}

