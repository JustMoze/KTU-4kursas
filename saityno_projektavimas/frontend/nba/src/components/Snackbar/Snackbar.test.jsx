import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import 'jest-styled-components'
import AppSnackbar from './Snackbar'

describe('Snackbar', () => {
  const handleClose = jest.fn()
  const initProps = {
    message: 'Hello from test',
    open: true,
    severity: 'error',
    handleClose: handleClose,
  }
  const wrapper = shallow(<AppSnackbar {...initProps} />)

  it('AppSnackbar renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
