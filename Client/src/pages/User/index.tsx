import React from 'react'
import { Redirect, useParams } from 'react-router-dom'
import UserDetail from '../../components/UserDetail'

export default function User() {
  const { userId } = useParams<{ userId?: string }>()

  return userId && Number(userId) ? (
    <UserDetail userId={Number(userId)} />
  ) : (
    <Redirect to="/" />
  )
}
