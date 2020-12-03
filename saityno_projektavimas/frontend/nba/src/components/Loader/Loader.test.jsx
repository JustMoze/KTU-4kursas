import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Loader from './Loader';


describe('Loader component', () => {
    const initProps = {
        size: 60
    } 
	it('Renders loader correctly', () => {
		let wrapper = shallow(<Loader {...initProps} />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
