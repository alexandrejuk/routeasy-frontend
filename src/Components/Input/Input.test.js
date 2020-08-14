import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Input from './'

describe('Input component', () => {
  it('Input should render and be updated correctly', () => {
    let currentValue = ''

    function callback (newValue) {
      currentValue = newValue
    }

    const { container, getByDisplayValue } = render(
      <Input
        name="InputName"
        onChange={callback}
        type="text"
        placeholder="InputName"
        value=""
      />
    )

    const input = getByDisplayValue(currentValue)

    expect(currentValue).toBe('')
    userEvent.type(input, 'Alexandre')
    expect(container).toMatchSnapshot()
  })
})
