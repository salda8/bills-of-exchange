import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from '../Link'
import { Paper, Typography } from '@material-ui/core'
import clsx from 'clsx'
import ReceiptIcon from '@material-ui/icons/Receipt'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  section: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: theme.spacing(12),
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    flexShrink: 0,
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    maxWidth: theme.spacing(128),
  },
  footer: {
    backgroundColor: theme.palette.grey[900],
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.common.white,
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  titleContainer: {
    display: 'flex',
    textDecoration: 'none',
    margin: theme.spacing(1, 0),
    alignItems: 'center',
  },
  logo: {
    fontSize: theme.typography.pxToRem(50),
    color: theme.palette.common.white,
    marginRight: theme.spacing(1),

    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(60),
      marginRight: theme.spacing(2),
    },
  },
  title: {
    fontSize: theme.typography.pxToRem(30),
    color: theme.palette.common.white,
    textDecoration: 'none',
    fontStyle: 'italic',
    fontWeight: 'bold',

    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(40),
    },
  },
  nav: {
    margin: theme.spacing(1, 0),
  },
  navItem: {
    color: theme.palette.secondary.light,
    textDecoration: 'none',
    fontSize: theme.typography.pxToRem(20),

    '& :hover': {
      TextDecoder: 'underline',
    },
  },
}))

interface Props {
  classes?: object
  className?: string
}

export default function Layout({
  classes: pClasses,
  className,
  children,
}: React.PropsWithChildren<Props>) {
  const classes = useStyles({ classes: pClasses })
  return (
    <div className={clsx(className, classes.root)}>
      <Paper component="header" className={classes.header} square>
        <Link className={classes.titleContainer} to="/">
          <ReceiptIcon className={classes.logo} />
          <Typography className={classes.title} variant="h1" component="h1">
            BOE CATALOG
          </Typography>
        </Link>
        <nav className={classes.nav}>
          <Link className={classes.navItem} to="/">
            Home
          </Link>
        </nav>
      </Paper>
      <Paper
        component="main"
        className={clsx(classes.section, classes.main)}
        elevation={6}
      >
        {children}
      </Paper>
      <Paper component="footer" className={classes.footer} square>
        2021 - BOE catalog
      </Paper>
    </div>
  )
}
