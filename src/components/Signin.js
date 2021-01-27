import React, { Fragment, useState } from 'react'
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

import {connect} from 'react-redux'

import { AccountCircle, Lock } from '@material-ui/icons'
import { handleSigninUser } from '../actions/authedUser'
import { handleShowErrorSnackBar, handleShowSuccessSnackBar } from '../actions/snackbar'

const useStyles = makeStyles({
  card: {},
  cardActions: {
    justifyContent: 'flex-end',
  },
  registerContainer: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'column',
  },
  orLabel: {
    alignSelf: 'center',
  },
})

const Signin = ({dispatch}) => {
  const classes = useStyles()
  const history = useHistory()

  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const redirectToRegister = () => {
    history.push('/register')
  }

  const handleSubmit = () => {
    dispatch(handleSigninUser(userId, password)).then(
      () => {
        dispatch(handleShowSuccessSnackBar('LOGADO!'))
      },
      (e) => dispatch(handleShowErrorSnackBar(e))
    )
  }

  return (
    <Fragment>
      <Card className={classes.card} raised>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Please Sign in
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            Example account: thor password: 1234
          </Typography>
          <form className={classes.root} noValidate autoComplete='off'>
            <TextField
              id='account'
              label='ID'
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              fullWidth
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
          <Button color='primary' onClick={handleSubmit}>
            Login
          </Button>
        </CardActions>
      </Card>
      <div className={classes.registerContainer}>
        <Typography variant='h6' component='h2' className={classes.orLabel}>
          OR
        </Typography>

        <Button
          color='primary'
          variant='contained'
          onClick={redirectToRegister}
        >
          Register
        </Button>
      </div>
    </Fragment>
  )
}

export default connect()(Signin)
