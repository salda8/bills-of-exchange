import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from './index'

jest.mock('../../components/ContentLayout', () => ({
  __esModule: true,
  default: () => <span>mocked content</span>,
}))

test('renders Home Page', async () => {
  render(<Home />)

  expect(screen.getByText(/home page/i)).toBeInTheDocument()
  expect(screen.getByText('mocked content')).toBeInTheDocument()
})
