import { getUsers } from '../utils/api'

export const RECEIVE_USERS = 'RECEIVE_USERS'

const receiveUsers = (users) => {
  return { type: RECEIVE_USERS, users }
}

export const handleGetUsers = () => {
  return (dispatch) => {
    return getUsers().then((users) => dispatch(receiveUsers(users)))
  }
}
