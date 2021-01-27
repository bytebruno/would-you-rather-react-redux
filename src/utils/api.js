import { _addUser, _getQuestions, _getUsers } from './_DATA.js'

export const getUsers = () => _getUsers()
export const addUser = (user) => _addUser(user)

export const getQuestions = () => _getQuestions()
