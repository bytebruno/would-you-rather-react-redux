import React, { Fragment } from 'react'
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
import { hideLoading } from 'react-redux-loading'
import { handleSaveQuestionAnswer } from '../actions/questions'

import QuestionAnsweredProgressBar from './QuestionAnsweredProgressBar'
import { handleUpdatedData } from '../actions/shared'
import { setRedirectPath } from '../actions/navigation'
import { useHistory } from 'react-router-dom'

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
  answeredOptionContainer: {
    position: 'relative',
    marginBottom: 32,
  },
  answeredOptionContainer2: {
    position: 'relative',
  },
  answeredWouldText: {
    fontSize: '1.60rem',
    marginBottom: 20,
  },
  answerText: {
    fontSize: '1.1rem',
  },
  answerVotesText: {
    fontSize: '0.8rem',
    marginTop: -6,
    fontWeight: 600,
  },
  yourVoteText: {},
  avatar: {
    width: 60,
    height: 60,
  },
}))

const Question = ({ dispatch, question, users, authedUser, loading }) => {
  const classes = useStyles()
  const history = useHistory()

  const [value, setValue] = React.useState('optionOne')

  let answeredResult = null
  let isAnswered = false

  if (authedUser === null) {
    dispatch(setRedirectPath(window.location.pathname))
    history.push('/signin')
    return null
  }

  if (question !== undefined) {
    isAnswered = authedUser.answers[question.id]

    if (isAnswered) {
      const optionOneVotes = question.optionOne.votes.length
      const optionTwoVotes = question.optionTwo.votes.length
      const totalVotes = optionOneVotes + optionTwoVotes

      answeredResult = {
        totalVotes: totalVotes,
        optionOne: {
          votes: optionOneVotes,
          pct: (optionOneVotes * 100) / totalVotes,
        },
        optionTwo: {
          votes: optionTwoVotes,
          pct: (optionTwoVotes * 100) / totalVotes,
        },
      }
    }
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const submitAnswer = () => {
    const authedUserId = authedUser.id
    const qid = question.id
    const answer = value

    dispatch(handleSaveQuestionAnswer(authedUserId, qid, answer)).then(
      () => {
        dispatch(handleUpdatedData(authedUserId)).then(() => {
          dispatch(hideLoading('main'))
        })
      },
      (e) => {
        dispatch(handleShowErrorSnackBar(e))
        dispatch(hideLoading('main'))
      }
    )
  }

  return (
    <div>
      {question === undefined ? (
        <h1>404 - Question Not Found :(</h1>
      ) : (
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
          {isAnswered ? (
            <Fragment>
              <CardContent className={classes.cardContent}>
                <Typography
                  variant='h6'
                  component='h6'
                  className={classes.answeredWouldText}
                >
                  Results
                </Typography>
                <div>
                  <div className={classes.answeredOptionContainer}>
                    {question.optionOne.votes.includes(authedUser.id) ? (
                      <Typography
                        variant='subtitle1'
                        component='p'
                        className={classes.yourVoteText}
                        color='secondary'
                      >
                        Your vote
                      </Typography>
                    ) : null}
                    <Typography
                      variant='h4'
                      component='h4'
                      className={classes.answerText}
                    >
                      {`Would you rather ${question.optionOne.text}?`}
                    </Typography>

                    <QuestionAnsweredProgressBar
                      value={answeredResult.optionOne.pct}
                      label={question.optionOne.text}
                    />
                    <Typography
                      variant='caption'
                      component='p'
                      className={classes.answerVotesText}
                      color='textSecondary'
                    >
                      {`${answeredResult.optionOne.votes} out of ${answeredResult.totalVotes} votes`}
                    </Typography>
                  </div>
                  <div className={classes.answeredOptionContainer2}>
                    {question.optionTwo.votes.includes(authedUser.id) ? (
                      <Typography
                        variant='subtitle1'
                        component='p'
                        className={classes.yourVoteText}
                        color='secondary'
                      >
                        Your vote
                      </Typography>
                    ) : null}
                    <Typography
                      variant='h4'
                      component='h4'
                      className={classes.answerText}
                    >
                      {`Would you rather ${question.optionTwo.text}?`}
                    </Typography>
                    <QuestionAnsweredProgressBar
                      value={answeredResult.optionTwo.pct}
                      label={question.optionTwo.text}
                    />
                    <Typography
                      variant='caption'
                      component='p'
                      className={classes.answerVotesText}
                      color='textSecondary'
                    >
                      {`${answeredResult.optionTwo.votes} out of ${answeredResult.totalVotes} votes`}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Fragment>
          ) : (
            <Fragment>
              <CardContent className={classes.cardContent}>
                <Typography
                  variant='h6'
                  component='h6'
                  className={classes.wouldText}
                >
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
                <Button
                  color='primary'
                  onClick={submitAnswer}
                  disabled={loading}
                >
                  Submit
                </Button>
              </CardActions>
            </Fragment>
          )}
        </Card>
      )}
    </div>
  )
}

const mapStateToProps = (
  { questions, users, authedUser, loadingBar },
  props
) => {
  const { id } = props.match.params
  const question = questions[id]

  return {
    id,
    question,
    users,
    authedUser,
    loading: loadingBar.main !== 0 ? true : false,
  }
}

export default withRouter(connect(mapStateToProps)(Question))
