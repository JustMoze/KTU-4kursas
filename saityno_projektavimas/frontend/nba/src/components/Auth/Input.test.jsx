import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import Input, {WhiteBorderTextField} from './Input'
import renderer from 'react-test-renderer';
import 'jest-styled-components'

configure({ adapter: new Adapter() })

describe('Input', () => {
    const handleChange = jest.fn();
    const initProps = {
      color: 'primary',
      error: false,
      message: '',
      name: 'login_email',
      value: 'kompotas@gmail.com',
      handleChange: handleChange,
      type: 'login'
    }
    it('Renders input correctly', () => {
      const customWrapper = shallow(<Input {...initProps} />)
      expect(toJson(customWrapper)).toMatchSnapshot();
    })

    const wrapper = shallow(<Input {...initProps} />)
    test('WhiteBorderTextField works', () => {
      const playerRow = renderer.create(<WhiteBorderTextField color={initProps.color} error={initProps.error} />).toJSON()
      expect(playerRow).toHaveStyleRule('color', initProps.color, {
          modifier: '& label.Mui-focused',
      })
      expect(playerRow).toHaveStyleRule('color', initProps.color, {
          modifier: '& label.Mui',
      })
      expect(playerRow).toHaveStyleRule('color', '#323232', {
          modifier: 'p.MuiFormHelperText-root',
      })
    })

    it('Updates the state', () => {
      const input = wrapper.find(WhiteBorderTextField);
      console.log('input', input.debug())
      input.simulate('change', {target: {text: 'kompotas1@gmail.com'}})
      console.log('input', input.debug())
    })
   
  })