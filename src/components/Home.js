import React from 'react'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'



const Home = ({authedUser}) => {

    const history = useHistory()

    if (authedUser === null) history.push('/signin')

    return <h2>Home</h2>
}

const mapStateToProps = ({authedUser}) => {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Home)