import React from 'react'
import { render } from '@testing-library/react'

import Delivery from './'

describe('Delivery component', () => {
  it('should render correctly', () => {
    const callback = jest.fn()

    const { container } = render(
      <Delivery
        data={[]}
        onSubmit={callback}
        actionTable={{}}
        geoCode={callback}
      />
    )

    expect(container).toMatchSnapshot()
  })
})
