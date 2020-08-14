import React from 'react'
import { action } from '@storybook/addon-actions'
import Deliveries from '../../../Containers/Deliveries'

export default {
  title: 'Containers/Deliveries',
  component: Deliveries,
}

const Template = ({
  actionTable,
  data,
  onSubmit,
}) => (
  <Deliveries
    actionTable={actionTable}
    data={data}
    onSubmit={onSubmit}
  />
)

export const Default = Template.bind({})

Default.args = {
  actionTable: {
    control: action('onClick'),
    field: 'Remove',
    label: 'Remove',
  },
  data: [{
    name: 'Eduardo',
    street: 'R. Ática',
    city: 'São Paulo',
    country: 'Brasil',
    lat: -23.531,
    lng: -46.584,
    weight: 10,
  }],
  onSubmit: action('onSubmit!'),
}
