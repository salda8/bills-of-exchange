import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Typography } from '@material-ui/core'
import Link from '../Link'
import { User } from '../../../types/user'

const useStyles = makeStyles((theme) => ({
  root: {},
  link: {
    color: theme.palette.primary.main,
  },
}))

interface Props extends User {
  classes?: object
  className?: string
  asLink?: boolean
}

export default function UserThumb({
  classes: pClasses,
  className,
  id,
  name,
  asLink,
}: Props) {
  const classes = useStyles({ classes: pClasses })

  if (asLink && name) {
    return (
      <Link
        className={clsx(className, classes.root, classes.link)}
        to={`/user/${id}`}
      >
        <Typography component="span">{name}</Typography>
      </Link>
    )
  }

  return (
    <Typography
      data-testid="username"
      component="span"
      className={clsx(className, classes.root)}
    >
      {name}
    </Typography>
  )
}
