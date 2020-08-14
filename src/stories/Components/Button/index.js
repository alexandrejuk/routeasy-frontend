import React from 'react'
import { action } from '@storybook/addon-actions'
import { Button } from '../../../Components/'

export default {
  title: 'Components/Button',
  component: Button,
}

const Template = ({
  children,
  onClick,
  type,
}) => (
  <Button
    onClick={onClick}
    type={type}
  >
    {children}
  </Button>
)

export const Primary = Template.bind({})

Primary.args = {
  children: 'Primary Button',
  onClick: action('onClick!'),
  type: 'primary',
}

export const Danger = Template.bind({})

Danger.args = {
  children: 'Danger Button',
  onClick: action('onClick!'),
  type: 'danger',
}
