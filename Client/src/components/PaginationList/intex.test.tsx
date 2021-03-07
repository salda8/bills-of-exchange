import React from 'react'
import { render, screen } from '@testing-library/react'
import PaginationList from './index'

test('renders pagination items', () => {
  render(
    <PaginationList
      onChange={(page) => {}}
      totalPages={10}
      page={2}
      items={[
        <span key="1">test child 1</span>,
        <span key="2">test child 2</span>,
      ]}
    />
  )
  const items = screen.getAllByText(/test child/i)
  expect(items.length).toBe(2)
})

test('renders pagination corectly', () => {
  render(
    <PaginationList
      onChange={(page) => {}}
      totalPages={10}
      page={2}
      items={[<span key="1">test child</span>]}
    />
  )
  ;['1', '10'].forEach((s) => {
    expect(screen.getByText(s)).toBeInTheDocument()
  })
})
