import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useBOE } from '../../api/hooks'
import UserThumb from '../UserThumb'
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight'
import Heading from '../Heading'
import { Paper, Typography } from '@material-ui/core'
import Error from '../Error'
import Loader from '../Loader'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  endorsementItem: {
    display: 'flex',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    marginBottom: theme.spacing(0.5),

    '& > *:first-child': {
      fontWeight: 'bold',
      marginRight: theme.spacing(1),
    },
  },
  icon: {
    paddingBottom: theme.spacing(0.5),
  },
  content: {
    padding: theme.spacing(2),
    flexGrow: 1,
  },
}))

interface Props {
  classes?: object
  className?: string
  boeId: number
}

export default function BoeDetail({
  classes: pClasses,
  className,
  boeId,
}: Props) {
  const classes = useStyles({ classes: pClasses })
  const [boeState, boe, boeError] = useBOE(boeId)

  const formattedAmount = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      currencyDisplay: 'narrowSymbol',
    }).format(amount)
  }

  return (
    <div data-testid="boe-detail" className={clsx(className, classes.root)}>
      {boeState === 'loading' && <Loader />}
      {boeState === 'done' && boeError && <Error error={boeError} />}
      {boeState === 'done' && boe && (
        <>
          <Heading mb>Bill of Exchange {boe.id}</Heading>
          <Paper data-testid="boe-detail-content" className={classes.content}>
            <div className={classes.row}>
              <Typography component="span">Drawee: </Typography>
              <UserThumb asLink {...boe.drawee} />
            </div>
            <div className={classes.row}>
              <Typography component="span">Amount: </Typography>
              <Typography component="span">
                {formattedAmount(boe.amount)}
              </Typography>
            </div>
            {boe.endorsement?.length > 0 && (
              <div className={classes.row}>
                <Typography component="span">First Payee: </Typography>
                <UserThumb asLink {...boe.endorsement[0]} />
              </div>
            )}
            <div className={classes.row}>
              <Typography component="span">Current Payee: </Typography>
              <UserThumb asLink {...boe.payee} />
            </div>
            {boe.endorsement?.length > 1 && (
              <div className={classes.row}>
                <Typography component="span">Endorsement: </Typography>
                <div>
                  {boe.endorsement.map((end, i) => (
                    <div className={classes.endorsementItem} key={end.id}>
                      {i > 0 && (
                        <SubdirectoryArrowRightIcon className={classes.icon} />
                      )}
                      <UserThumb asLink {...end} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Paper>
        </>
      )}
    </div>
  )
}
