import { SIGNIN_USER } from '../actions/authedUser'

const authedUser = (state = null, action) => {
  const { loggedUser } = action

  switch (action.type) {
    case SIGNIN_USER:
      return {
        ...state,
        ...loggedUser,
      }
    default:
      return state
  }
}

export default authedUser
