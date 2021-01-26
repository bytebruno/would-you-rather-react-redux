import React, { useEffect, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux'
import { handleGetUsers } from '../actions/users'
import { handleGetQuestions } from '../actions/questions'

import LoadingBar from 'react-redux-loading'

import Nav from './Nav'
import Login from './Login'
import { Container } from '@material-ui/core'

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
              <Route path='/login' exact component={Login} />
            </Container>
          )}
        </div>
      </Fragment>
    </Router>
  )
}

const useStyles = makeStyles({
  container: {
    marginTop: 40,
  },
})

const mapStateToProps = () => {
  return {
    loading: false,
  }
}

export default connect(mapStateToProps)(App)
