import React, { PropsWithChildren } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {},
  normal: {
    fontSize: theme.typography.pxToRem(28),
  },
  small: {
    fontSize: theme.typography.pxToRem(22),
  },
  mb: {
    marginBottom: theme.spacing(1),
  },
}))

interface Props {
  classes?: object
  className?: string
  size?: 'small' | 'normal'
  component?: 'h2' | 'h3' | 'h4'
  mb?: boolean
}

export default function Heading({
  classes: pClasses,
  className,
  children,
  size = 'normal',
  component = 'h2',
  mb,
}: PropsWithChildren<Props>) {
  const classes = useStyles({ classes: pClasses })
  return (
    <Typography
      component={component}
      className={clsx(className, classes.root, classes[size], mb && classes.mb)}
    >
      {children}
    </Typography>
  )
}
