import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Card,
  InputAdornment,
  CardActions,
  CardContent,
  Button,
  Typography,
  makeStyles,
  TextField,
} from '@material-ui/core'

import { connect } from 'react-redux'

import { AccountCircle, Lock } from '@material-ui/icons'
import { handleSigninUser } from '../actions/authedUser'
import { handleShowErrorSnackBar } from '../actions/snackbar'
import { hideLoading } from 'react-redux-loading'

const useStyles = makeStyles({
  card: {},
  cardActions: {
    justifyContent: 'flex-end',
  },
  registerContainer: {
    marginTop: 100,
    display: 'flex',
    flexDirection: 'column',
  },
  orLabel: {
    alignSelf: 'center',
    marginBottom: 10,
  },
})

const Signin = ({ dispatch, authedUser, loading, navigation }) => {
  const classes = useStyles()
  const history = useHistory()

  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (authedUser !== null) {
      history.push(navigation.path)
    }
  }, [authedUser, history, navigation.path])

  const redirectToRegister = () => {
    history.push('/register')
  }

  const handleSubmit = () => {
    dispatch(handleSigninUser(userId, password))
      .then(
        () => {
          dispatch(hideLoading('main'))
        },
        (e) => {
          dispatch(handleShowErrorSnackBar(e))
          dispatch(hideLoading('main'))
        }
      )
      .then(() => {
        history.push(navigation.path)
        return null
      })
  }

  return (
    <Fragment>
      <Card className={classes.card} raised>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Please Sign in
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            ID: sarahedo | johndoe | tylermcginnis - password: 1234
          </Typography>
          <form className={classes.root} noValidate autoComplete='off'>
            <TextField
              id='account'
              label='ID'
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              fullWidth
              autoComplete='username'
              margin='normal'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              id='password'
              label='Password'
              type='password'
              fullWidth
              margin='normal'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='current-password'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button color='primary' onClick={handleSubmit} disabled={loading}>
            Sign In
          </Button>
        </CardActions>
      </Card>
      <div className={classes.registerContainer}>
        <Typography
          variant='h6'
          component='h2'
          color='primary'
          className={classes.orLabel}
        >
          OR
        </Typography>

        <Button
          color='primary'
          variant='outlined'
          onClick={redirectToRegister}
          disabled={loading}
        >
          Register
        </Button>
      </div>
    </Fragment>
  )
}

const mapStateToProps = ({ authedUser, loadingBar, navigation }) => {
  return {
    authedUser,
    loading: loadingBar.main !== 0 ? true : false,
    navigation
  }
}

export default connect(mapStateToProps)(Signin)
