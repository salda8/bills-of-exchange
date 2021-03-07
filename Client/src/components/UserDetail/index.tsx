import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useUser } from '../../api/hooks'
import UserBoes from './UserBoes'
import ContentLayout from '../ContentLayout'
import Heading from '../Heading'
import Error from '../Error'
import Loader from '../Loader'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
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
  userId: number
}

export default function UserDetail({
  classes: pClasses,
  className,
  userId,
}: Props) {
  const classes = useStyles({ classes: pClasses })
  const [state, user, error] = useUser(userId)

  return (
    <>
      {state === 'loading' && <Loader />}
      {state === 'done' && error && <Error error={error} />}
      {state === 'done' && user && (
        <div
          data-testid="user-detail"
          className={clsx(className, classes.root)}
        >
          <Heading mb>{user.name}`s Profile</Heading>
          <ContentLayout>
            <UserBoes
              className={classes.contentItem}
              type="drawee"
              userId={userId}
              title={`${user.name}\`s Drawee BOEs:`}
            />
            <UserBoes
              className={classes.contentItem}
              type="payee"
              userId={userId}
              title={`${user.name}\`s Payee BOEs:`}
            />
          </ContentLayout>
        </div>
      )}
    </>
  )
}
