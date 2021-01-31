import React, { useEffect, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { makeStyles, Container } from '@material-ui/core'

import { connect } from 'react-redux'
import { handleGetUsers } from '../actions/users'
import { handleGetQuestions } from '../actions/questions'

import LoadingBar from 'react-redux-loading'

import Nav from './Nav'
import SnackBar from './SnackBar'
import Signin from './Signin'
import Register from './Register'
import Home from './Home'
import Question from './Question'
import GuardedRoute from './GuardedRoute'

const App = ({ dispatch, loading }) => {
  const classes = useStyles()

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
            <Container maxWidth='sm' className={classes.container}>
              <Fragment>
                <Route path='/signin' exact component={Signin} />
                <Route path='/register' exact component={Register} />
                <GuardedRoute path='/question/:id' exact component={Question} />
                <GuardedRoute path='/' exact component={Home} />
              </Fragment>
            </Container>
          )}
        </div>
      </Fragment>
      <SnackBar />
    </Router>
  )
}

const useStyles = makeStyles({
  container: {
    marginTop: 40,
  },
})

const mapStateToProps = ({ loading, authedUser }) => {
  return {
    authedUser,
    loading: false,
  }
}

export default connect(mapStateToProps)(App)
