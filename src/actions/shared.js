import { getInitialData, getUpdatedData} from '../utils/api'
import { receiveQuestions } from './questions'
import { receiveUsers } from './users'

import {showLoading, hideLoading} from 'react-redux-loading'
import { signinUserAction } from './authedUser'

export const handleInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading('main'))
    getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
      dispatch(hideLoading('main'))
    })
  }
}

export const handleUpdatedData = (userId) => {
    return (dispatch) => {
      return getUpdatedData(userId).then(({ users, questions, authedUser }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(signinUserAction(authedUser))
      })
    }
  }
