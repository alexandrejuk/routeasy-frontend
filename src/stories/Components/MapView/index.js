import React from 'react'
import { MapView } from '../../../Components'

export default {
  title: 'Components/MapView',
  component: MapView,
}

const Template = ({ data }) => (
  <MapView deliveries={data} />
)

export const Default = Template.bind({})

Default.args = {
  data: [{
    name: 'Eduardo',
    street: 'R. Ática',
    city: 'São Paulo',
    country: 'Brasil',
    lat: -23.531,
    lng: -46.584,
    weight: 10,
  }],
}
