import React, { useEffect, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { makeStyles, Container } from '@material-ui/core'

import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

import LoadingBar from 'react-redux-loading'

import Nav from './Nav'
import SnackBar from './SnackBar'
import Signin from './Signin'
import Register from './Register'
import Home from './Home'
import Question from './Question'
import QuestionCreate from './QuestionCreate'
import GuardedRoute from './GuardedRoute'
import Leaderboard from './Leaderboard'

const App = ({ dispatch, loading }) => {
  const classes = useStyles()

  useEffect(() => {
    dispatch(handleInitialData())
  }, [dispatch])

  return (
    <Router>
      <Fragment>
        <LoadingBar style={{ backgroundColor: 'white' }} scope='main'/>
        <div>
          <Nav />
          <Container maxWidth='sm' className={classes.container}>
            {loading ? null : (
              <Fragment>
                <GuardedRoute
                  path='/leaderboard'
                  exact
                  component={Leaderboard}
                />
                <GuardedRoute path='/' exact component={Home} />
              </Fragment>
            )}
            <GuardedRoute path='/add' exact component={QuestionCreate} />
            <GuardedRoute path='/question/:id' exact component={Question} />
            <Route path='/signin' exact component={Signin} />
            <Route path='/register' exact component={Register} />
          </Container>
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

const mapStateToProps = ({ authedUser, loadingBar }) => {
  return {
    authedUser,
    loading: loadingBar.main !== 0 ? true : false
  }
}

export default connect(mapStateToProps)(App)
