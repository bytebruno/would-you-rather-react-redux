import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Avatar from '@material-ui/core/Avatar'
import CardContent from '@material-ui/core/CardContent'

import Typography from '@material-ui/core/Typography'
import { getAvatar } from '../utils/avatar-helper'

import { handleGetUsers } from '../actions/users'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 40,
  },

  cardContent: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  nameContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
  nameText: {
    fontSize: '1.5rem',
    marginLeft: 20,
  },
  total: {
    position: 'absolute',
    right: 0,
    top: 0,
    fontSize: '2rem',
  },
  scoreContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 32,
  },
  avatar: {
    width: 100,
    height: 100,
  },
}))

const Leaderboard = ({ users }) => {
  const classes = useStyles()

  const orderUsersByScore = () =>
  Object.values(users).sort((a, b) => {
    return a.questions.length + Object.keys(a.answers).length >
      b.questions.length + Object.keys(b.answers).length
      ? -1
      : 1
  })

  const orderedUsers = orderUsersByScore();

  return (
    <div>
      {orderedUsers.map((user) => {
         console.log(user)
        return (
       
        <Card key={user.id} className={classes.root} raised>
          <CardContent className={classes.cardContent}>
            <div className={classes.nameContainer}>
              <Avatar
                src={getAvatar(user.avatarURL)}
                className={classes.avatar}
              />
              <Typography
                variant='h6'
                component='h6'
                className={classes.nameText}
              >
                {user.name}
              </Typography>
              <Typography
                variant='h6'
                component='h6'
                className={classes.total}
                color='secondary'
              >
                {Object.keys(user.answers).length + user.questions.length}
              </Typography>
            </div>

            <div className={classes.scoreContainer}>
              <Typography variant='body1' color='secondary' component='p'>
                {`Answered questions: ${Object.keys(user.answers).length}`}
              </Typography>
              <Typography variant='body1' color='secondary' component='p'>
                {`Created questions: ${user.questions.length}`}
              </Typography>
            </div>
          </CardContent>
        </Card>
      )})}
    </div>
  )
}

const mapStateToProps = ({ users }) => {
  return {
    users,
  }
}

export default connect(mapStateToProps)(Leaderboard)
