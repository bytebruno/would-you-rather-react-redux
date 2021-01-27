import { getUsers, addUser } from '../utils/api'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER = 'ADD_USER'

const receiveUsers = (users) => {
  return { type: RECEIVE_USERS, users }
}

export const handleGetUsers = () => {
  return (dispatch) => {
    return getUsers().then((users) => dispatch(receiveUsers(users)))
  }
}


const addUserAction = (user) => {
  return { type: ADD_USER, user }
}

export const handleAddUser = (user) => {
  return (dispatch) => {
    return addUser(user).then((savedUser) => dispatch(addUserAction(savedUser)))
  }
}
