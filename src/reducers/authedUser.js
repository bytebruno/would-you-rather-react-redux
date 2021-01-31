import { SIGNIN_USER, SIGNOUT_USER } from '../actions/authedUser'

const authedUser = (state = null, action) => {
  const { loggedUser } = action

  switch (action.type) {
    case SIGNIN_USER:
      return {
        ...state,
        ...loggedUser,
      }
    case SIGNOUT_USER:
      return null
    default:
      return state
  }
}

export default authedUser
