import { getQuestions, saveQuestionAnswer, addQuestion } from '../utils/api'
import { showLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export const receiveQuestions = (questions) => {
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
    dispatch(showLoading('main'))
    return saveQuestionAnswer({authedUserId, qid, answer}).then(() => dispatch(saveQuestionAnswerAction()))
  }
}

const addQuestionAction = (question) => {
  return { type: ADD_QUESTION, question }
}

export const handleAddQuestion = (question) => {
  return (dispatch) => {
    dispatch(showLoading('main'))
    return addQuestion(question).then((savedQuestion) => dispatch(addQuestionAction(savedQuestion)))
  }
}

