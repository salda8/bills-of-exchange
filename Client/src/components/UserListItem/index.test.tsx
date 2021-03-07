import React from 'react'
import { render, screen } from '@testing-library/react'
import UserListItem from './index'
import { BrowserRouter } from 'react-router-dom'
import usersData from '../../data/users.mock.json'

test('renders boe list item', () => {
  const data = usersData[0]
  render(
    <BrowserRouter>
      <UserListItem {...data} />
    </BrowserRouter>
  )
  expect(screen.getByText(data.name)).toBeInTheDocument()
})
