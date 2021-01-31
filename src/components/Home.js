import React from 'react'
import { connect } from 'react-redux'

import QuestionTabs from './QuestionTabs'

const Home = () => {
  return <QuestionTabs />
}

export default connect()(Home)
