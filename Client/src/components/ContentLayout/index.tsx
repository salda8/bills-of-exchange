import React, { PropsWithChildren } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,

    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  },
}))

interface Props {
  classes?: object
  className?: string
}

export default function ContentLayout({
  classes: pClasses,
  className,
  children,
}: PropsWithChildren<Props>) {
  const classes = useStyles({ classes: pClasses })
  return <div className={clsx(className, classes.root)}>{children}</div>
}
