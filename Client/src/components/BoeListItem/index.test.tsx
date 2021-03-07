import React from 'react'
import { render, screen } from '@testing-library/react'
import BoeListItem from './index'
import { BrowserRouter } from 'react-router-dom'
import boesData from '../../data/boes.mock.json'

test('renders boe list item', () => {
  const data = boesData[0]
  render(
    <BrowserRouter>
      <BoeListItem {...data} />
    </BrowserRouter>
  )
  expect(screen.getByTestId('boe-list-item')).toBeInTheDocument()
  expect(screen.getByText(data.id)).toBeInTheDocument()
})
