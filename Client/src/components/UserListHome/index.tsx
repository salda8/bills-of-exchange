import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useUsers } from '../../api/hooks'
import { Paper } from '@material-ui/core'
import PaginationList from '../PaginationList'
import UserListItem from '../UserListItem'
import Heading from '../Heading'
import clsx from 'clsx'
import Loader from '../Loader'

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    margin: theme.spacing(1, 0),
    display: 'block',
  },
  list: {
    flexGrow: 1,
  },
}))

interface Props {
  classes?: object
  className?: string
}

export default function UserListHome({ classes: pClasses, className }: Props) {
  const classes = useStyles({ classes: pClasses })
  const [page, setPage] = React.useState<number>(1)
  const [state, users] = useUsers(page)

  return (
    <Paper className={clsx(className, classes.root)}>
      <Heading size="small" component="h3">
        Users list:
      </Heading>
      {state === 'loading' && <Loader />}
      {users && users?.data?.length > 0 && (
        <PaginationList
          classes={{
            root: classes.list,
          }}
          totalPages={users.total}
          page={page}
          onChange={setPage}
          items={users.data.map((user) => (
            <UserListItem key={user.id} className={classes.item} {...user} />
          ))}
        />
      )}
    </Paper>
  )
}
