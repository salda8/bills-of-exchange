import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useBOEs } from '../../api/hooks'
import { Paper } from '@material-ui/core'
import PaginationList from '../PaginationList'
import BoeListItem from '../BoeListItem'
import Heading from '../Heading'
import clsx from 'clsx'
import Loader from '../Loader'

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    margin: theme.spacing(1, 0),
  },
  list: {
    flexGrow: 1,
  },
}))

interface Props {
  classes?: object
  className?: string
}

export default function BoeListHome({ classes: pClasses, className }: Props) {
  const classes = useStyles({ classes: pClasses })
  const [page, setPage] = React.useState<number>(1)
  const [state, boes] = useBOEs(page)

  return (
    <Paper className={clsx(className, classes.root)}>
      <Heading size="small" component="h3">
        Bills of exchange list:
      </Heading>
      {state === 'loading' && <Loader />}
      {state === 'done' && boes && boes?.data?.length > 0 && (
        <PaginationList
          classes={{
            root: classes.list,
          }}
          totalPages={boes.total}
          page={page}
          onChange={setPage}
          items={boes.data.map((boe) => (
            <BoeListItem key={boe.id} className={classes.item} {...boe} />
          ))}
        />
      )}
    </Paper>
  )
}
