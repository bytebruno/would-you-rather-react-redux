import React from 'react'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'

import QuestionTabs from './QuestionTabs'



const Home = ({authedUser}) => {

    const history = useHistory()

    if (authedUser === null) {
        history.push('/signin')
        return null;
    } 

    return (
        <QuestionTabs />
    )
}

const mapStateToProps = ({authedUser}) => {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Home)