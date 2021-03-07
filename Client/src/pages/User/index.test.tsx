import React from 'react'
import { render, screen } from '@testing-library/react'
import { Route, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import User from './index'

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as Object),
  __esModule: true,
  Redirect: () => <span>mocked redirect</span>,
}))
jest.mock('../../components/UserDetail', () => ({
  __esModule: true,
  default: () => <span>mocked detail</span>,
}))

test('renders redirect when is no userId in params', async () => {
  const history = createMemoryHistory()
  history.push('/user/')
  render(
    <Router history={history}>
      <User />
    </Router>
  )
  expect(screen.getByText('mocked redirect')).toBeInTheDocument()
})

test('renders redirect when userId in not number', async () => {
  const history = createMemoryHistory()
  history.push('/user/abcde')
  render(
    <Router history={history}>
      <Route path="/user/:userId">
        <User />
      </Route>
    </Router>
  )
  expect(screen.getByText('mocked redirect')).toBeInTheDocument()
})

test('renders User detail with userId', async () => {
  const boeId = 2622653
  const history = createMemoryHistory()
  history.push('/user/' + boeId)
  render(
    <Router history={history}>
      <Route path="/user/:userId">
        <User />
      </Route>
    </Router>
  )

  expect(screen.getByText('mocked detail')).toBeInTheDocument()
})
