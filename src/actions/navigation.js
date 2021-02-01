export const SET_REDIRECT_PATH = 'SET_REDIRECT_PATH'
export const CLEAR_REDIRECT_PATH = 'CLEAR_REDIRECT_PATH'

export const setRedirectPath = (path) => {
  return { type: SET_REDIRECT_PATH, path }
}

export const clearRedirectPath = () => {
  return { type: CLEAR_REDIRECT_PATH }
}

export const handleSetRedirectPath = (path) => {
    return (dispatch) => {
      return dispatch(setRedirectPath(path))
    }
  }
  
