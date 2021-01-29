import { getQuestions, saveQuestionAnswer } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

const receiveQuestions = (questions) => {
  return { type: RECEIVE_QUESTIONS, questions }
}

export const handleGetQuestions = () => {
  return (dispatch) => {
    return getQuestions().then((questions) => dispatch(receiveQuestions(questions)))
  }
}

const saveQuestionAnswerAction = () => {
  return { type: SAVE_QUESTION_ANSWER }
}

export const handleSaveQuestionAnswer = (authedUserId, qid, answer) => {
  return (dispatch) => {
    return saveQuestionAnswer({authedUserId, qid, answer}).then(() => dispatch(saveQuestionAnswerAction()))
  }
}
