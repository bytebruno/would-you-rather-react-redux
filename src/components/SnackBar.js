import React, { useEffect } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import {
  handleHideSuccessSnackBar,
  handleHideErrorSnackBar,
} from '../actions/snackbar'

const Alert = (props) => <MuiAlert elevation={6} variant='filled' {...props} />

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

const SnackBar = ({ dispatch, showSuccess, showError, message }) => {
  const classes = useStyles()

  useEffect(() => {
    let successTimeout = null
    let errorTimeout = null
    
    if (showSuccess) {
      successTimeout = setTimeout(() => {
        dispatch(handleHideSuccessSnackBar())
      }, 2000)
      return () => clearTimeout(successTimeout)
    }

    if (showError) {
      errorTimeout = setTimeout(() => {
        dispatch(handleHideErrorSnackBar())
      }, 3000)
      return () => clearTimeout(errorTimeout)
    }
  })

  const handleSuccessClose = () => {
    dispatch(handleHideSuccessSnackBar())
  }

  const handleErrorClose = () => {
    dispatch(handleHideErrorSnackBar())
  }

  return (
    <div className={classes.root}>
      <Snackbar open={showSuccess} onClose={handleSuccessClose}>
        <Alert onClose={handleSuccessClose} severity='success'>
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={showError} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity='error'>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

const mapStateToProps = ({ snackbar }) => {
  const { showSuccess, showError, message } = snackbar
  return {
    showSuccess,
    showError,
    message,
  }
}

export default connect(mapStateToProps)(SnackBar)
