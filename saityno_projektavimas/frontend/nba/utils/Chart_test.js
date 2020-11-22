import React from 'react'
import { CustomTr } from './Chart'
import renderer from 'react-test-renderer'
import 'jest-styled-components'


test('Charts styled component', () => {
    const props = {
        color: '#ffffff'
    }
    const component = renderer.create(<CustomTr color={props.color} />).toJSON();
    expect(component).toHaveStyleRule('background-color', props.color)
});