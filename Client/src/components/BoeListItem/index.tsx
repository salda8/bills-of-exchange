import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { BOE } from '../../../types/boe'
import Link from '../Link'
import UserThumb from '../UserThumb'
import clsx from 'clsx'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  link: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
}))

interface Props extends BOE {
  classes?: object
  className?: string
}
// {'->'}
export default function BoeListItem({
  classes: pClasses,
  className,
  id,
  drawee,
  payee,
  amount,
  endorsement,
}: Props) {
  const classes = useStyles({ classes: pClasses })
  return (
    <div data-testid="boe-list-item" className={clsx(className, classes.root)}>
      <Link className={classes.link} to={`/boe/${id}`}>
        <Typography component="span">{id}</Typography>
      </Link>
      <UserThumb {...drawee} /> <KeyboardArrowRightIcon />{' '}
      <UserThumb {...payee} />
    </div>
  )
}
