import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useUserBOEs } from '../../api/hooks'
import { UserBoeType } from '../../../types/user'
import BoeList from '../BoeList'
import { Paper } from '@material-ui/core'
import clsx from 'clsx'
import Heading from '../Heading'
import Loader from '../Loader'

const useStyles = makeStyles({
  root: {},
})

interface Props {
  classes?: object
  className?: string
  type: UserBoeType
  userId: number
  title: string
}

export default function UserBoes({
  classes: pClasses,
  className,
  type,
  userId,
  title,
}: Props) {
  const classes = useStyles({ classes: pClasses })
  const [page, setPage] = useState<number>(1)
  const [state, boes] = useUserBOEs(userId, type, page)

  return (
    <Paper className={clsx(className, classes.root)}>
      <Heading component="h3" size="small">
        {title}
      </Heading>
      {state === 'loading' && <Loader />}
      {state === 'done' && boes?.data && (
        <BoeList
          boes={boes.data}
          totalPages={boes.total}
          page={page}
          onChange={setPage}
        />
      )}
    </Paper>
  )
}
