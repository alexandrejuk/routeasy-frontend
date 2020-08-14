import React from 'react'
import { Input } from '../../../Components'
import { action } from '@storybook/addon-actions/dist';

export default {
  title: 'Components/Input',
  component: Input,
}

const Template = ({
  disable,
  name,
  onChange,
  placeholder,
  type,
  value,
}) => (
  <Input
    disable={disable}
    name={name}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
    value={value}
  />
)

export const inputNumber = Template.bind({})

inputNumber.args = {
  name: 'inputName',
  onChange: action('onChange!'),
  placeholder: 'Input Number',
  type: 'number',
  value: '',
}

export const inputText = Template.bind({})

inputText.args = {
  name: 'inputName',
  onChange: action('onChange!'),
  placeholder: 'Input Text',
  type: 'text',
  value: '',
}


export const inputNumberDisable = Template.bind({})

inputNumberDisable.args = {
  disable: true,
  name: 'inputName',
  onChange: action('onChange!'),
  placeholder: 'Input Number Disable',
  type: 'number',
  value: '',
}

export const inputTextDisable = Template.bind({})

inputTextDisable.args = {
  disable: true,
  name: 'inputName',
  onChange: action('onChange!'),
  placeholder: 'Input Text Disable',
  type: 'text',
  value: '',
}
