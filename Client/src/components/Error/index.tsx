import { Typography } from '@material-ui/core'
import React from 'react'
import { Redirect } from 'react-router'
import { ApiError } from '../../../types/api'

interface Props {
  error: ApiError
}

export default function Error({ error }: Props) {
  if (error?.code === 'not_found') {
    return <Redirect to="/404" />
  }

  if (error?.code === 'api_error') {
    return (
      <Typography>
        Error while loading your data, please try again...
      </Typography>
    )
  }

  return null
}
