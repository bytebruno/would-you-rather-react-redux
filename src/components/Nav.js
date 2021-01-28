import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Button,
  Menu,
  Typography,
  Avatar,
} from '@material-ui/core'

import { getAvatar } from '../utils/avatar-helper'


import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  userName: {
    fontSize: '0.9rem',
  },
}))

const Nav = ({ authedUser }) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Button
            component={Link}
            to={'/'}
            color='inherit'
            className={classes.root}
          >
            Home
          </Button>
          <Button
            component={Link}
            to={'/'}
            color='inherit'
            className={classes.root}
          >
            New Question
          </Button>
          <Button
            component={Link}
            to={'/'}
            color='inherit'
            className={classes.root}
          >
            Leader Board
          </Button>
          {authedUser && (
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <Avatar alt={authedUser.name} src={getAvatar(authedUser.avatarURL)} />
              </IconButton>

              <Typography component='span' className={classes.userName}>
                {authedUser.name}
              </Typography>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(Nav)
