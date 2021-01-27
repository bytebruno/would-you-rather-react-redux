import React, { Fragment, useState } from 'react'
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

import { AccountCircle, Lock } from '@material-ui/icons'

import { connect } from 'react-redux'

import { handleAddUser } from '../actions/users'
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
  yourIdLabel: {
    fontSize: '0.8rem',
  },
})

const Register = ({ dispatch }) => {
  const classes = useStyles()

  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleUserNameInput = (e) => {
    let inputValue = e.target.value

    if (inputValue.length > 0) {
      const generatedId = inputValue.replace(/ /g, '').toLowerCase()
      setUserId(generatedId)
      setUserName(inputValue)
    } else {
      setUserId('')
      setUserName('')
    }
  }

  const handlePasswordInput = (e) => {
    let inputValue = e.target.value

    if (inputValue.length > 0) {
      setPassword(inputValue)
    } else {
      setPassword('')
    }
  }

  const setDefaultState = () => {
    setUserId('')
    setUserName('')
    setPassword('')
  }

  const handleSubmit = () => {
    dispatch(handleAddUser({ id: userId, name: userName, password })).then(
      () => {
        dispatch(handleShowSuccessSnackBar('User registered!'))
        setDefaultState()
      },
      (e) => dispatch(handleShowErrorSnackBar(e))
    )
  }

  return (
    <Fragment>
      <Card className={classes.card} raised>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Register
          </Typography>

          <form className={classes.root} noValidate autoComplete='off'>
            <TextField
              id='name'
              label='Name'
              autoComplete='username'
              value={userName}
              onChange={(e) => handleUserNameInput(e)}
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
            <Typography component='p' className={classes.yourIdLabel}>
              Your ID is: <b>{userId}</b>
            </Typography>

            <TextField
              id='password'
              label='Password'
              value={password}
              onChange={(e) => handlePasswordInput(e)}
              type='password'
              autoComplete='current-password'
              fullWidth
              margin='normal'
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
            Register
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  )
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps)(Register)
