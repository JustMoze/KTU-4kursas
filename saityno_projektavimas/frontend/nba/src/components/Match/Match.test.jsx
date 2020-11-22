import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import Match, {MatchCol, MatchButton, RotateSquareUserTeam} from './Match'
import { Col } from 'react-grid-system'
import 'jest-styled-components'

configure({ adapter: new Adapter() })

describe('Match component', () => {
    const handleClose = jest.fn();
    const initProps = {
        open: true,
        handleClose: handleClose
    }
   
    it('Renders input correctly', () => {
      const customWrapper = shallow(<Match {...initProps} />)
      expect(toJson(customWrapper)).toMatchSnapshot();
    })
    const wrapper = shallow(<Match {...initProps} />)
    it('Check styled component rendering', () => {
        const MatchButton_div = shallow(<MatchButton color={initProps.color} />)
        const MatchCol_div = shallow(<MatchCol color={initProps.color} />)
        const RotateSquareUserTeam_div = shallow(<RotateSquareUserTeam color={initProps.color} />)
        expect(MatchButton_div.find('div')).toHaveStyleRule('background-color', initProps.color);
        expect(MatchCol_div.find(Col)).toHaveStyleRule('background-color', initProps.color);
        expect(RotateSquareUserTeam_div.find('div')).toHaveStyleRule('background-color', initProps.color);
    })
   
  })