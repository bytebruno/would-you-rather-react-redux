import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

import { getAvatar } from '../utils/avatar-helper'
import { handleShowErrorSnackBar } from '../actions/snackbar'
import { handleSaveQuestionAnswer, handleGetQuestions } from '../actions/questions'
import { handleGetUsers } from '../actions/users'
import { handleGetLastAuthedUserData } from '../actions/authedUser'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 40,
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  cardContent: {
    textAlign: 'center',
  },
  header: {
    paddingBottom: 0,
  },
  wouldText: {
    fontSize: '1.60rem',
  },
  avatar: {
    width: 60,
    height: 60,
  },
}))

const Question = ({ dispatch, question, users, authedUser }) => {
  const classes = useStyles()

  const [value, setValue] = React.useState('optionOne')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const submitAnswer = () => {
    const authedUserId = authedUser.id
    const qid = question.id
    const answer = value

    dispatch(handleSaveQuestionAnswer(authedUserId, qid, answer)).then(
      () => {
        console.log('teoricamente OK')
        dispatch(handleGetUsers())
        dispatch(handleGetQuestions())
        dispatch(handleGetLastAuthedUserData(authedUserId))
       
      },
      (e) => dispatch(handleShowErrorSnackBar(e))
    )
  }

  return (
    <Card className={classes.root} raised>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar
            aria-label='recipe'
            className={classes.avatar}
            src={getAvatar(users[question.author].avatarURL)}
          />
        }
        title={`${users[question.author].name} asks:`}
        subheader={new Date(question.timestamp).toLocaleDateString('en-US')}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant='h6' component='h6' className={classes.wouldText}>
          Would you rather
        </Typography>
        <FormControl component='fieldset'>
          <RadioGroup
            aria-label='would'
            name='would'
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value='optionOne'
              control={<Radio />}
              label={question.optionOne.text}
            />
            <FormControlLabel
              value='optionTwo'
              control={<Radio />}
              label={question.optionTwo.text}
            />
          </RadioGroup>
        </FormControl>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Button color='primary' onClick={submitAnswer}>
          Submit
        </Button>
      </CardActions>
    </Card>
  )
}

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { id } = props.match.params
  const question = questions[id]

  return {
    id,
    question,
    users,
    authedUser,
  }
}

export default withRouter(connect(mapStateToProps)(Question))
