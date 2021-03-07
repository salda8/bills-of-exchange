import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from '../Link'
import clsx from 'clsx'
import { User } from '../../../types/user'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

interface Props extends User {
  classes?: object
  className?: string
}

export default function UserListItem({
  classes: pClasses,
  className,
  id,
  name,
}: Props) {
  const classes = useStyles({ classes: pClasses })
  return (
    <Link className={clsx(className, classes.root)} to={`/user/${id}`}>
      <Typography component="span">{name}</Typography>
    </Link>
  )
}
