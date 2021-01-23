import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { connect } from 'react-redux'
import { handleGetUsers } from './actions/users'

import { handleGetQuestions } from './actions/questions'

const App = ({ dispatch }) => {
  useEffect(() => {
    dispatch(handleGetUsers())
    dispatch(handleGetQuestions())
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default connect()(App)
