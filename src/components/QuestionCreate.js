import React, { Fragment, useState } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  makeStyles,
  TextField,
} from '@material-ui/core'

import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  handleShowErrorSnackBar,
  handleShowSuccessSnackBar,
} from '../actions/snackbar'

import { handleAddQuestion } from '../actions/questions'
import { handleGetUsers } from '../actions/users'
import { hideLoading } from 'react-redux-loading'

const useStyles = makeStyles({
  form: { textAlign: 'center' },
  wouldTitle: {
    marginTop: 32,
  },
  orText: {
    marginTop: 10,
    marginBottom: 0,
  },
  optionTwoInput: {
    marginTop: -10,
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
})

const QuestionCreate = ({ dispatch, authedUser, loading }) => {
  const classes = useStyles()
  const history = useHistory()

  const [optionOne, setOptionOne] = useState('')
  const [optionTwo, setOptionTwo] = useState('')

  const handleOptionOneInput = (e) => {
    setOptionOne(e.target.value)
  }

  const handleOptionTwoInput = (e) => {
    setOptionTwo(e.target.value)
  }

  const setDefaultState = () => {
    setOptionOne('')
    setOptionTwo('')
  }

  const handleSubmit = () => {
    if (optionOne.split(' ').length < 2 || optionTwo.split(' ').length < 2) {
      dispatch(
        handleShowErrorSnackBar('Please, type two words at least on each input')
      )
      return
    }

    dispatch(
      handleAddQuestion({
        author: authedUser.id,
        optionOneText: optionOne,
        optionTwoText: optionTwo,
      })
    ).then(
      () => {
        setDefaultState()
        dispatch(handleShowSuccessSnackBar('Question created! Redirecting...'))
        dispatch(handleGetUsers()).then(() => {
          dispatch(hideLoading())
          history.push('/')
        })
      },
      (e) => dispatch(handleShowErrorSnackBar(e))
    )
  }

  return (
    <Fragment>
      <Card className={classes.card} raised>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Create a new question
          </Typography>

          <form className={classes.form} noValidate autoComplete='off'>
            <Typography
              gutterBottom
              variant='h6'
              component='h2'
              className={classes.wouldTitle}
            >
              Would you rather...
            </Typography>
            <TextField
              id='optionOne'
              label='Option one text'
              value={optionOne}
              onChange={handleOptionOneInput}
              fullWidth
              margin='normal'
            />
            <Typography
              gutterBottom
              variant='h6'
              component='h2'
              className={classes.orText}
            >
              OR
            </Typography>

            <TextField
              id='optionTwo'
              label='Option two text'
              value={optionTwo}
              onChange={handleOptionTwoInput}
              className={classes.optionTwoInput}
              fullWidth
              margin='normal'
            />
          </form>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button color='primary' onClick={handleSubmit} disabled={loading}>
            Add Question
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  )
}

const mapStateToProps = ({ authedUser, loadingBar }) => {
  return { authedUser, loading: loadingBar.default === 1 ? true : false }
}

export default connect(mapStateToProps)(QuestionCreate)
