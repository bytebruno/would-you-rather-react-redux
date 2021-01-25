import React, { useEffect } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { handleGetUsers } from './actions/users'
import { handleGetQuestions } from './actions/questions'

import Nav from './components/Nav'
import Login from './components/Login'

const App = ({ dispatch }) => {
  useEffect(() => {
    dispatch(handleGetUsers())
    dispatch(handleGetQuestions())
  }, [])

  return (
    <div className='App'>
      <Nav />
      <Login />
    </div>
  )
}

export default connect()(App)
