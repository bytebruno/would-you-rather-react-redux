import { signinUser } from '../utils/api'

export const SIGNIN_USER = 'SIGNIN_USER'

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
