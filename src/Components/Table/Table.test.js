import React from 'react'
import {
  fireEvent,
  render,
} from '@testing-library/react'
import Table from './'

const mockDelivery = [{
  name: 'Eduardo',
  street: 'R. Ática',
  city: 'São Paulo',
  country: 'Brasil',
  lat: -23.531,
  lng: -46.584,
  weight: 10,
}]

const mockActionTable = {
  control: null,
  field: 'Action',
  label: 'Action',
}

describe('Table component', () => {
  it('should render correctly without action', () => {
    const { container } = render(
      <Table
        data={mockDelivery}
      />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render correctly with action', () => {
    const control = jest.fn()

    const { container, getByTestId } = render(
      <Table
        actionTable={{...mockActionTable, control}}
        data={mockDelivery}
      />
    )
    expect(control).not.toHaveBeenCalled()

    fireEvent.click(getByTestId('button'))

    expect(control).toHaveBeenCalled()
    expect(container).toMatchSnapshot()
  })
})
