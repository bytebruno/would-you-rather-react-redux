import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const GuardedRoute = ({ component: Component, authedUser, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authedUser !== null ? <Component {...props} /> : <Redirect to='/signin' />
    }
  />
)

const mapStateToProps = ({authedUser}) => {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(GuardedRoute)
