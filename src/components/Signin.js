import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Card,
  InputAdornment,
  CardActions,
  CardContent,
  Button,
  Typography,
  makeStyles,
  TextField,
  FormControl,
} from '@material-ui/core'

import { AccountCircle, Lock } from '@material-ui/icons'

const useStyles = makeStyles({
  card: {},
  cardActions: {
    justifyContent: 'flex-end',
  },
  registerContainer: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'column',
  },
  orLabel: {
    alignSelf: 'center',
  },
})

const Signin = () => {
  const classes = useStyles()
  const history = useHistory()
  
  const redirectToRegister = () => {
    history.push('/register')
  }

  return (
    <Fragment>
      <Card className={classes.card} raised>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Please Sign in
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            Example account: thor password: 1234
          </Typography>
          <form className={classes.root} noValidate autoComplete='off'>
            <FormControl fullWidth margin='normal'>
              <TextField
                id='account'
                label='ID'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl fullWidth margin='normal'>
              <TextField
                id='password'
                label='Password'
                type='password'
                autoComplete='current-password'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </form>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button color='primary'>Login</Button>
        </CardActions>
      </Card>
      <div className={classes.registerContainer}>
        <Typography variant='h6' component='h2' className={classes.orLabel}>
          OR
        </Typography>

        <Button color='primary' variant='contained' onClick={redirectToRegister}>
          Register
        </Button>
      </div>
    </Fragment>
  )
}

export default Signin
