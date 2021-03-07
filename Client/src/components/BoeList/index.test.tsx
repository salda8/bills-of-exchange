import React from 'react'
import { render, screen } from '@testing-library/react'
import BoeList from './index'
import { BrowserRouter } from 'react-router-dom'
import boesData from '../../data/boes.mock.json'

test('renders pagination items', () => {
  const data = boesData.slice(0, 5)
  render(
    <BrowserRouter>
      <BoeList boes={data} onChange={(page) => {}} page={1} totalPages={10} />
    </BrowserRouter>
  )
  expect(screen.getByTestId('pagination-list')).toBeInTheDocument()
  expect(screen.getAllByTestId('boe-list-item').length).toBe(5)
})
