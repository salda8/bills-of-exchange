import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PaginationList from '../PaginationList'
import BoeListItem from '../BoeListItem'
import { BOE } from '../../../types/boe'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    margin: theme.spacing(1, 0),
  },
}))

interface Props {
  classes?: object
  className?: string
  boes: BOE[]
  onChange: (page: number) => void
  page: number
  totalPages: number
}

export default function BoeList({
  classes: pClasses,
  className,
  boes,
  onChange,
  page,
  totalPages,
}: Props) {
  const classes = useStyles({ classes: pClasses })

  return (
    <PaginationList
      className={clsx(className, classes.root)}
      totalPages={totalPages}
      page={page}
      onChange={onChange}
      items={boes.map((boe) => (
        <BoeListItem key={boe.id} className={classes.item} {...boe} />
      ))}
    />
  )
}
