import React from 'react'
import {
  fireEvent,
  render,
} from '@testing-library/react'
import Button from './'

const PRIMARY_BUTTON_TEXT = 'Primary Button'
const DANGER_BUTTON_TEXT = 'Danger Button'

describe('Button component', () => {
  it('should render correctly primary button', () => {
    const callback = jest.fn()
    const { container, getByText } = render(
      <Button onClick={callback} type="primary" >
        {PRIMARY_BUTTON_TEXT}
      </Button>
    )
    const SampleButton = getByText(PRIMARY_BUTTON_TEXT)

    expect(callback).not.toHaveBeenCalled()

    fireEvent.click(SampleButton)

    expect(callback).toHaveBeenCalled()
    expect(container).toMatchSnapshot()
  })

  it('should render correctly danger button', () => {
    const callback = jest.fn()
    const { container, getByText } = render(
      <Button onClick={callback} type="danger">
        {DANGER_BUTTON_TEXT}
      </Button>
    )
    const SampleButton = getByText(DANGER_BUTTON_TEXT)

    expect(callback).not.toHaveBeenCalled()

    fireEvent.click(SampleButton)

    expect(callback).toHaveBeenCalled()
    expect(container).toMatchSnapshot()
  })
})
