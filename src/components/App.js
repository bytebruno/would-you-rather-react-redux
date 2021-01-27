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
              <Route path='/login' exact component={Signin} />
              <Route path='/register' exact component={Register} />
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

const mapStateToProps = () => {
  return {
    loading: false,
  }
}

export default connect(mapStateToProps)(App)
