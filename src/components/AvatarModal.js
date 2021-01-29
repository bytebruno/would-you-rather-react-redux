import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Modal from '@material-ui/core/Modal'
import Avatar from '@material-ui/core/Avatar'
import { getAvatar, ALL_AVATARS } from '../utils/avatar-helper'

const getModalStyle = () => {
  return {
    top: '20%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
  },
  paperTitle:{
    marginTop:0
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 10,
    cursor: 'pointer',
  },
}))

const AvatarModal = ({ open, handleClose }) => {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)

  const body = (
    <div
      style={modalStyle}
      className={classes.paper}
      classes={{ focused: classes.paperFocused }}
    >
      <h2 id='simple-modal-title' className={classes.paperTitle}>Choose your avatar</h2>
      <div className={classes.avatarContainer}>
        {ALL_AVATARS.map((name) => (
          <Avatar
            key={name}
            src={getAvatar(name)}
            className={classes.avatar}
            onClick={() => handleClose(name)}
          />
        ))}
      </div>
      <AvatarModal />
    </div>
  )

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </div>
  )
}

export default AvatarModal
