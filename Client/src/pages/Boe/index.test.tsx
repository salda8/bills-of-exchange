import React from 'react'
import { render, screen } from '@testing-library/react'
import { Route, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Boe from './index'

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as Object),
  __esModule: true,
  Redirect: () => <span>mocked redirect</span>,
}))
jest.mock('../../components/BoeDetail', () => ({
  __esModule: true,
  default: () => <span>mocked detail</span>,
}))

test('renders redirect when is no boeId in params', async () => {
  const history = createMemoryHistory()
  history.push('/boe/')
  render(
    <Router history={history}>
      <Boe />
    </Router>
  )
  expect(screen.getByText('mocked redirect')).toBeInTheDocument()
})

test('renders redirect when boeId in not number', async () => {
  const history = createMemoryHistory()
  history.push('/boe/abcde')
  render(
    <Router history={history}>
      <Route path="/boe/:boeId">
        <Boe />
      </Route>
    </Router>
  )
  expect(screen.getByText('mocked redirect')).toBeInTheDocument()
})

test('renders BOE detail with boeId', async () => {
  const boeId = 2622653
  const history = createMemoryHistory()
  history.push('/boe/' + boeId)
  render(
    <Router history={history}>
      <Route path="/boe/:boeId">
        <Boe />
      </Route>
    </Router>
  )

  expect(screen.getByText('mocked detail')).toBeInTheDocument()
})
