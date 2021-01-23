import { getQuestions } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

const receiveQuestions = (questions) => {
  return { type: RECEIVE_QUESTIONS, questions }
}

export const handleGetQuestions = () => {
  return (dispatch) => {
    return getQuestions().then((questions) => dispatch(receiveQuestions(questions)))
  }
}
