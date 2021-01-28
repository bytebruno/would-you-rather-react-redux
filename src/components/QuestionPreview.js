import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    marginBottom: 40,
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  cardContent: {
    textAlign: 'center',
  },
  media: {
    height: 0,
    // paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

const QuestionPreview = ({ question, authorName }) => {
  const classes = useStyles()
  console.log(question)

  if (question === undefined) return null

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            {authorName[0]}
          </Avatar>
        }
        title={`${authorName} asks:`}
        subheader={new Date(question.timestamp).toLocaleDateString("en-US")}
      />
      <CardMedia
        className={classes.media}
        image='/static/images/cards/paella.jpg'
        title='Paella dish'
      />
      <CardContent className={classes.cardContent}>
        <Typography variant='h6' component='h6'>
          Would you rather?
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
        <Button color='primary' onClick={() => {}}>
          View Poll
        </Button>
      </CardActions>
    </Card>
  )
}

export default QuestionPreview
