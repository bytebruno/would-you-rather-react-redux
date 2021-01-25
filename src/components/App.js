import React, { useEffect, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { connect } from 'react-redux'
import { handleGetUsers } from '../actions/users'
import { handleGetQuestions } from '../actions/questions'

import LoadingBar from 'react-redux-loading'

import Nav from './Nav'
import Login from './Login'

const App = ({ dispatch, loading }) => {
  useEffect(() => {
    dispatch(handleGetUsers())
    dispatch(handleGetQuestions())
  }, [])

  return (
    <Router>
      <Fragment>
        <LoadingBar />
        <div>
          <Nav />
          {loading ? null : (
            <div>
              <Route path='/login' exact component={Login} />
            </div>
          )}
        </div>
      </Fragment>
    </Router>
  )
}

const mapStateToProps = () => {
  return {
    loading: false
  }
}

export default connect(mapStateToProps)(App)
