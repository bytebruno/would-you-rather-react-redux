import React from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

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
  wouldText: {
    fontSize: '1.60rem'
  },
  header: {
    paddingBottom: 0,
  },
  avatar: {
    width: 60,
    height: 60,
  },
}))

const QuestionPreview = ({ question, authorName, userAvatar }) => {
  const classes = useStyles()
  console.log(question)

  if (question === undefined) return null

  return (
    <Card className={classes.root} raised>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar
            aria-label='recipe'
            className={classes.avatar}
            src={userAvatar}
          />
        }
        title={`${authorName} asks:`}
        subheader={new Date(question.timestamp).toLocaleDateString('en-US')}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant='h6' component='h6' className={classes.wouldText}>
          Would you rather
        </Typography>
        <Typography variant='body2' color='secondary' component='p'>
          ...
          {`${question.optionOne.text.split(' ')[0]} ${
            question.optionOne.text.split(' ')[1]
          }`}
          ...
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Button component={Link} to={`/question/${question.id}`} color='primary'>
          View Poll
        </Button>
      </CardActions>
    </Card>
  )
}

export default QuestionPreview
