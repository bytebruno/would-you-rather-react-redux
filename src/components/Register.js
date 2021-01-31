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
  Avatar,
} from '@material-ui/core'

import { AccountCircle, Lock } from '@material-ui/icons'
import { hideLoading } from 'react-redux-loading'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { handleAddUser } from '../actions/users'
import { handleSigninUser } from '../actions/authedUser'
import {
  handleShowErrorSnackBar,
  handleShowSuccessSnackBar,
} from '../actions/snackbar'
import { getAvatar } from '../utils/avatar-helper'

import AvatarModal from './AvatarModal'

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
  avatarContainer: {
    display: 'flex',
    marginTop: 40,
  },
  avatarButton: {
    marginLeft: 20,
  },
  avatar: {
    width: 50,
    height: 50,
  },
})

const Register = ({ dispatch, loading }) => {
  const classes = useStyles()
  const history = useHistory()

  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const [userAvatar, setUserAvatar] = useState('av1')
  const [userAvatarImage, setUserAvatarImage] = useState(getAvatar('av1'))

  const [open, setOpen] = useState(false)

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
    setUserAvatar('')
    setUserAvatarImage(getAvatar('av1'))
  }

  const handleSubmit = () => {
    dispatch(
      handleAddUser({
        id: userId,
        name: userName,
        password,
        avatarURL: userAvatar,
      })
    ).then(
      (action) => {
        dispatch(handleShowSuccessSnackBar('User registered! Redirecting...'))
        dispatch(handleSigninUser(action.user.id, action.user.password)).then(
          () => {
            dispatch(hideLoading())
            history.push('/')
            return null
          },
          (e) => {
            dispatch(hideLoading())
            dispatch(handleShowErrorSnackBar(e))
          }
        )
        setDefaultState()
      },
      (e) => {
        dispatch(hideLoading())
        dispatch(handleShowErrorSnackBar(e))
      }
    )
  }

  const handleClose = (name) => {
    if (typeof name === 'string') {
      setUserAvatarImage(getAvatar(name))
      setUserAvatar(name)
    }

    setOpen(false)
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
          <div className={classes.avatarContainer}>
            <Avatar
              alt='user avatar'
              src={userAvatarImage}
              className={classes.avatar}
            />
            <Button
              type='button'
              onClick={() => setOpen(true)}
              className={classes.avatarButton}
              disabled={loading}
            >
              Choose your avatar
            </Button>
          </div>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button color='primary' onClick={handleSubmit} disabled={loading}>
            Register
          </Button>
        </CardActions>
      </Card>
      <AvatarModal open={open} handleClose={handleClose} />
    </Fragment>
  )
}

const mapStateToProps = ({ loadingBar }) => {
  return {
    loading: loadingBar.default === 1 ? true : false,
  }
}

export default connect(mapStateToProps)(Register)
