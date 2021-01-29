import { signinUser, getLastAuthedUserData } from '../utils/api'

export const SIGNIN_USER = 'SIGNIN_USER'
export const GET_LAST_USER_DATA = 'GET_LAST_USER_DATA'

const signinUserAction = (loggedUser) => {
  return { type: SIGNIN_USER, loggedUser }
}

export const handleSigninUser = (id, password) => {
  return (dispatch) => {
    return signinUser(id, password).then((loggedUser) => {
      dispatch(signinUserAction(loggedUser))
    })
  }
}

export const handleGetLastAuthedUserData = (authedUserId) => {
  return (dispatch) => {
    return getLastAuthedUserData(authedUserId).then((loggedUser) => {
      dispatch(signinUserAction(loggedUser))
    })
  }
}
