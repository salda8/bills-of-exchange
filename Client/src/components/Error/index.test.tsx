import React from 'react'
import { render, screen } from '@testing-library/react'
import Error from './index'
import { ApiError } from '../../../types/api'

jest.mock('react-router', () => ({
  __esModule: true,
  Redirect: () => <span>mocked redirect</span>,
}))

const notFoundError: ApiError = {
  code: 'not_found',
}
const apiErrorError: ApiError = {
  code: 'api_error',
}

test('renders not_found error', () => {
  const data = notFoundError
  render(<Error error={data} />)
  expect(screen.getByText('mocked redirect')).toBeInTheDocument()
})

test('renders api_error error', () => {
  const data = apiErrorError
  render(<Error error={data} />)
  expect(screen.getByText(/Error while loading your data/i)).toBeInTheDocument()
})
