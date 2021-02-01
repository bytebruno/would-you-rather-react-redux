import { CLEAR_REDIRECT_PATH, SET_REDIRECT_PATH } from '../actions/navigation'

const navigation = (state = { path: '/' }, action) => {
  switch (action.type) {
    case SET_REDIRECT_PATH:
      return {
        ...state,
        path: action.path,
      }
    case CLEAR_REDIRECT_PATH:
      return { ...state, path: '/' }
    default:
      return state
  }
}

export default navigation
