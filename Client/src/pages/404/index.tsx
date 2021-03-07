import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Heading from '../../components/Heading'
import { Paper, Typography } from '@material-ui/core'
import Link from '../../components/Link'

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: theme.spacing(2),
  },
}))

interface Props {
  classes?: object
  className?: string
}

export default function Page404({ classes: pClasses, className }: Props) {
  const classes = useStyles({ classes: pClasses })
  return (
    <>
      <Heading mb>404 - Not Found</Heading>
      <Paper className={classes.content}>
        <Typography>
          Sorry, content you are looking for does not exist.
        </Typography>
        <Typography>
          You can go to <Link to="/">Home Page</Link> and start again.
        </Typography>
      </Paper>
    </>
  )
}
