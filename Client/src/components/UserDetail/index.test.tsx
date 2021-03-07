import React from 'react'
import { render, screen } from '@testing-library/react'
import UserDetail from './index'
import * as apiHooks from '../../api/hooks'
import users from '../../data/users.mock.json'
import boes from '../../data/boes.mock.json'

jest.mock('../../api/hooks')

test('renders loading when fetching data', () => {
  ;(apiHooks.useUser as jest.Mock).mockImplementation(() => [
    'loading',
    null,
    null,
  ])
  const data = users[0]
  render(<UserDetail userId={data.id} />)
  expect(screen.getByTestId('loader')).toBeInTheDocument()
})

test('renders user when has data', () => {
  const data = users[0]
  ;(apiHooks.useUser as jest.Mock).mockImplementation(() => [
    'done',
    data,
    null,
  ])
  ;(apiHooks.useUserBOEs as jest.Mock).mockImplementation(() => [
    'done',
    boes,
    null,
  ])
  render(<UserDetail userId={data.id} />)
  expect(
    screen.getAllByText(new RegExp(data.name, 'i')).length
  ).toBeGreaterThan(0)
})
