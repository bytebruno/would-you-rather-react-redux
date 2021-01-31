import { signinUser, getLastAuthedUserData } from '../utils/api'
import { hideLoading, showLoading } from 'react-redux-loading'

export const SIGNIN_USER = 'SIGNIN_USER'
export const SIGNOUT_USER = 'SIGNOUT_USER'
export const GET_LAST_USER_DATA = 'GET_LAST_USER_DATA'

const signinUserAction = (loggedUser) => {
  return { type: SIGNIN_USER, loggedUser }
}

export const signoutUserAction = () => {
  return { type: SIGNOUT_USER }
}

export const handleSigninUser = (id, password) => {
  return (dispatch) => {
    dispatch(showLoading())
    return signinUser(id, password)
      .then((loggedUser) => dispatch(signinUserAction(loggedUser)))
      .then(() => dispatch(hideLoading()))
  }
}

export const handleGetLastAuthedUserData = (authedUserId) => {
  return (dispatch) => {
    return getLastAuthedUserData(authedUserId).then((loggedUser) => {
      dispatch(signinUserAction(loggedUser))
    })
  }
}
