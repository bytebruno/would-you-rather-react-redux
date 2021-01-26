import React from 'react'
import {
  Card,
  InputAdornment,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
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
      justifyContent: 'flex-end'
  }
})

const Login = () => {
  const classes = useStyles()

  return (
    <Card className={classes.card} raised>
      {/* <CardMedia
          component='img'
          alt='Contemplative Reptile'
          height='140'
          image='/static/images/cards/contemplative-reptile.jpg'
          title='Contemplative Reptile'
        /> */}
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
            Please Log in
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            Example account: thor password: 1234
          </Typography>
        <form className={classes.root} noValidate autoComplete='off'>
          <FormControl fullWidth margin='normal'>
            <TextField
              id='account'
              label='Account'
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
  )
}

export default Login
