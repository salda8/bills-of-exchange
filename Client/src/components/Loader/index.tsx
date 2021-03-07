import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
  },
}))

interface Props {
  classes?: object
  className?: string
}

export default function Loader({ classes: pClasses, className }: Props) {
  const classes = useStyles({ classes: pClasses })
  return (
    <div data-testid="loader" className={clsx(className, classes.root)}>
      <CircularProgress />
    </div>
  )
}
