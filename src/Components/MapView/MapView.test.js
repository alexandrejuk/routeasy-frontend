import React from 'react'
import { render } from '@testing-library/react'
import MapView from './'

const mockDelivery = [{
  name: 'Eduardo',
  street: 'R. Ática',
  city: 'São Paulo',
  country: 'Brasil',
  lat: -23.531,
  lng: -46.584,
  weight: 10,
}]

const mapConfig = {
  center: {
    lat: -23.531,
    lng: -46.584,
  },
  zoom: 12,
}

describe('MapView component', () => {
  it('should render correctly without marker', () => {
    const { container } = render(
      <MapView deliveries={[]} mapConfig={mapConfig} />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render correctly one marker', () => {
    const { container, getByText } = render(
      <MapView deliveries={mockDelivery} mapConfig={mapConfig} />
    )
    getByText('1')
    expect(container).toMatchSnapshot()
  })
})
