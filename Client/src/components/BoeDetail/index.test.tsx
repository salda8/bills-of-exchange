import React from 'react'
import { render, screen } from '@testing-library/react'
import BoeDetail from './index'
import * as apiHooks from '../../api/hooks'
import boes from '../../data/boes.mock.json'
import { BrowserRouter } from 'react-router-dom'

jest.mock('../../api/hooks')

test('renders loading when fetching data', () => {
  ;(apiHooks.useBOE as jest.Mock).mockImplementation(() => [
    'loading',
    null,
    null,
  ])
  const data = boes[0]
  render(
    <BrowserRouter>
      <BoeDetail boeId={data.id} />
    </BrowserRouter>
  )
  expect(screen.getByTestId('loader')).toBeInTheDocument()
  expect(screen.queryByText(new RegExp(data.id.toString(), 'i'))).toBeFalsy()
})

test('renders BOE fetch data', () => {
  const data = boes[0]
  ;(apiHooks.useBOE as jest.Mock).mockImplementation(() => ['done', data, null])
  render(
    <BrowserRouter>
      <BoeDetail boeId={data.id} />
    </BrowserRouter>
  )
  expect(
    screen.getByText(new RegExp(data.id.toString(), 'i'))
  ).toBeInTheDocument()
})
