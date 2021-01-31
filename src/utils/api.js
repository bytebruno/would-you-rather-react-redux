import {
  _addUser,
  _getQuestions,
  _getUsers,
  _signinUser,
  _saveQuestionAnswer,
  _getLastAuthedUserData,
  _saveQuestion,
} from './_DATA.js'

export const getInitialData = () => {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export const getUsers = () => _getUsers()
export const addUser = (user) => _addUser(user)
export const signinUser = (id, password) => _signinUser(id, password)
export const getLastAuthedUserData = (authedUserId) =>
  _getLastAuthedUserData(authedUserId)

export const getQuestions = () => _getQuestions()
export const saveQuestionAnswer = (answerObj) => _saveQuestionAnswer(answerObj)
export const addQuestion = (question) => _saveQuestion(question)
