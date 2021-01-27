import { _addUser, _getQuestions, _getUsers, _signinUser } from './_DATA.js'

export const getUsers = () => _getUsers()
export const addUser = (user) => _addUser(user)
export const signinUser = (id, password) => _signinUser(id, password)

export const getQuestions = () => _getQuestions()
