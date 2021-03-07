import React from 'react'
import { render, screen } from '@testing-library/react'
import UserThumb from './index'
import { BrowserRouter } from 'react-router-dom'
import usersData from '../../data/users.mock.json'

test('renders username as link', () => {
  const data = usersData[0]
  render(
    <BrowserRouter>
      <UserThumb asLink {...data} />
    </BrowserRouter>
  )
  expect(screen.getByTestId('link')).toBeInTheDocument()
  expect(screen.getByText(data.name)).toBeInTheDocument()
})

test('renders username as text', () => {
  const data = usersData[0]
  render(
    <BrowserRouter>
      <UserThumb {...data} />
    </BrowserRouter>
  )
  expect(screen.getByText(data.name)).toBeInTheDocument()
})
