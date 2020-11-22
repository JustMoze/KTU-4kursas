import React from 'react'
import { shallow, configure, mount } from 'enzyme'
import Footer, {IconContainer, Site_Footer} from './Footer'
import { FiInstagram } from 'react-icons/fi'
import { AiOutlineLinkedin, AiFillTwitterCircle } from 'react-icons/ai'
import Router from 'next/router'
jest.mock('next/router', ()=> ({push: jest.fn()}))
import 'jest-styled-components'


describe('Footer', () => {
  const props = {
    color: '#ffffff',
  }
  it('Renders footer correctly', () => {
    shallow(<Footer {...props} />)
  })
  const wrapper = shallow(<Footer {...props} />)
  it('Renders icon containers correctly', () => {
    expect(wrapper.find(IconContainer)).toHaveLength(3)
  })
  it('Footer icons component ', () => {
    expect(wrapper.find(FiInstagram)).toHaveLength(1)
    expect(wrapper.find(AiOutlineLinkedin)).toHaveLength(1)
    expect(wrapper.find(AiFillTwitterCircle)).toHaveLength(1)
  })

  it('should render styled component', () => {
    expect(wrapper.find(Site_Footer)).toHaveStyleRule('background-color', props.color);
  })

  // const onClick = jest.fn();
  it('should call router push method', () => {
    const AiOutlineLinkedin_btn = wrapper.find('#AiOutlineLinkedin');
    AiOutlineLinkedin_btn.simulate('click');
    expect(Router.push).toHaveBeenCalledWith('https://www.linkedin.com/in/modestas-rimeikis/')
    
    const FiInstagram_btn = wrapper.find('#FiInstagram');
    FiInstagram_btn.simulate('click');
    expect(Router.push).toHaveBeenCalledWith('https://www.instagram.com/')

    const AiFillTwitterCircle_btn = wrapper.find('#AiFillTwitterCircle');
    AiFillTwitterCircle_btn.simulate('click');
    expect(Router.push).toHaveBeenCalledWith('https://twitter.com/')
  })
})
