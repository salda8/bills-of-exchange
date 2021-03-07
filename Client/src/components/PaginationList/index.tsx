import React, { PropsWithChildren, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    flexGrow: 1,
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

interface Props {
  classes?: object
  className?: string
  totalPages: number
  page: number
  onChange: (page: number) => void
  items: JSX.Element[]
}

export default function PaginationList({
  classes: pClasses,
  className,
  children,
  totalPages,
  page,
  onChange,
  items,
}: PropsWithChildren<Props>) {
  const classes = useStyles({ classes: pClasses })

  const handlePageChange = useCallback(
    (evt, p: number) => {
      if (p !== page) {
        onChange(p)
      }
    },
    [page, onChange]
  )

  return (
    <>
      <div
        data-testid="pagination-list"
        className={clsx(className, classes.root)}
      >
        {items}
      </div>
      <Pagination
        className={classes.pagination}
        page={page}
        count={totalPages}
        onChange={handlePageChange}
      />
    </>
  )
}
