import React, { PropsWithChildren } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink, LinkProps } from 'react-router-dom'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
  },
}))

interface Props extends LinkProps {
  classes?: object
  className?: string
}

export default function Link({
  classes: pClasses,
  className,
  to,
  children,
}: PropsWithChildren<Props>) {
  const classes = useStyles({ classes: pClasses })
  return (
    <RouterLink
      className={clsx(className, classes.root)}
      to={to}
      data-testid="link"
    >
      {children}
    </RouterLink>
  )
}
