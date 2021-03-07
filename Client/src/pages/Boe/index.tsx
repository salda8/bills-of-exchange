import React from 'react'
import { Redirect, useParams } from 'react-router-dom'
import BoeDetail from '../../components/BoeDetail'

export default function Boe() {
  const { boeId } = useParams<{ boeId?: string }>()

  return boeId && Number(boeId) ? (
    <BoeDetail boeId={Number(boeId)} />
  ) : (
    <Redirect to="/" />
  )
}
