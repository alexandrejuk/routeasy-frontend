import React from 'react'
import { Table } from '../../../Components'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/Table',
  component: Table,
}

const tableData = [{
  name: 'Eduardo',
  street: 'R. Ática',
  city: 'São Paulo',
  country: 'Brasil',
  lat: -23.531,
  lng: -46.584,
  weight: 10,
}]

const Template = ({
  actionTable,
  data,
}) => (
  <Table
    actionTable={actionTable}
    data={data}
  />
)

export const Default = Template.bind({})

Default.args = {
  actionTable: null,
  data: tableData,
}

export const DefaultWithAction = Template.bind({})

DefaultWithAction.args = {
  actionTable: {
    control: action('onClick'),
    field: 'Action',
    label: 'Action',
  },
  data: tableData,
}
