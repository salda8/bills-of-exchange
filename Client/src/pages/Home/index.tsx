import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import UserListHome from '../../components/UserListHome'
import BoeListHome from '../../components/BoeListHome'
import Heading from '../../components/Heading'
import ContentLayout from '../../components/ContentLayout'

const useStyles = makeStyles((theme) => ({
  root: {},
  contentItem: {
    width: '100%',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1, 0),

    [theme.breakpoints.up('md')]: {
      width: '48%',
      height: '100%',
      margin: theme.spacing(0),
    },
  },
}))

interface Props {
  classes?: object
  className?: string
}

export default function Home({ classes: pClasses, className }: Props) {
  const classes = useStyles({ classes: pClasses })
  return (
    <>
      <Heading mb>Home Page</Heading>
      <ContentLayout>
        <UserListHome className={classes.contentItem} />
        <BoeListHome className={classes.contentItem} />
      </ContentLayout>
    </>
  )
}
