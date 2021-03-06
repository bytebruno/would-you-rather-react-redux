import { combineReducers } from 'redux'
import users from './users'
import authedUser from './authedUser'
import questions from './questions'
import snackbar from './snackbar'
import navigation from './navigation'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  users,
  authedUser,
  questions,
  loadingBar: loadingBarReducer,
  snackbar,
  navigation
})
