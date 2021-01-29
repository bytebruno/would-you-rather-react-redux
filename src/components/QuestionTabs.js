import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import QuestionPreview from './QuestionPreview'
import { getAvatar} from '../utils/avatar-helper'

import { connect } from 'react-redux'

const QuestionTabs = ({
  questions,
  authedUser,
  users,
  orderedQuestionsIds,
}) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  if (questions === null || questions === undefined) return null

  const answeredQuestionsIds = orderedQuestionsIds.filter((questionId) =>
    Object.keys(authedUser.answers).includes(questionId)
  )
  const unansweredQuestionsIds = orderedQuestionsIds.filter(
    (questionId) => !Object.keys(authedUser.answers).includes(questionId)
  )

  console.log(answeredQuestionsIds)
  console.log(unansweredQuestionsIds)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='Questions'
          indicatorColor='primary'
          textColor='primary'
          centered
          variant='fullWidth'
        >
          <Tab label='Unanswered Questions' {...a11yProps(0)} />
          <Tab label='Answered Questions' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {unansweredQuestionsIds &&
          unansweredQuestionsIds.map((id) => (
            <QuestionPreview
              key={questions[id].id}
              question={questions[id]}
              authorName={users[questions[id].author].name}
              userAvatar={getAvatar(users[questions[id].author].avatarURL)}
            />
          ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {answeredQuestionsIds &&
          answeredQuestionsIds.map((id) => (
            <QuestionPreview
              key={questions[id].id}
              question={questions[id]}
              authorName={users[questions[id].author].name}
              userAvatar={getAvatar(users[questions[id].author].avatarURL)}
            />
          ))}
      </TabPanel>
    </div>
  )
}

const mapStateToProps = ({ questions, authedUser, users }) => {
  return {
    orderedQuestionsIds: Object.keys(questions).sort(
          (a, b) => questions[b].timestamp - questions[a].timestamp
        ),
    questions,
    users,
    authedUser,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}))

export default connect(mapStateToProps)(QuestionTabs)

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component='div'>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
