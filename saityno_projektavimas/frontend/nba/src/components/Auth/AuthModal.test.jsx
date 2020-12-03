import React from 'react'
import { shallow } from 'enzyme'
import AuthModal, { LogoContainer } from './AuthModal'
import toJson from 'enzyme-to-json'
import Input from './Input'
import 'jest-styled-components'


describe('Auth modal', () => {
	const handleClose = jest.fn();
	const handleChange = jest.fn();
	const handleSubmit = jest.fn();

    const initProps = {
        color: '#ffffff',
        open: true,
        user: {
            email: 'kompotas@gmail.com', password: 'kompotas123'
        },
        type: 'login', 
        handleClose: handleClose,
        handleChange: handleChange,
        handleSubmit: handleSubmit
    }
    const wrapper = shallow(<AuthModal {...initProps} />);

    it('AuthModal renders correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    })

    it('should render styled component', () => {
        const styledWrapper = shallow(<LogoContainer color={initProps.color} />)
        let toJsonComponent = JSON.stringify(styledWrapper.debug());
        let indexOf = toJsonComponent.indexOf('color') + 7;
        let color = toJsonComponent.slice(indexOf, indexOf+8);
        let fullColor = color.concat("\"");
        expect(fullColor).toMatch(initProps.color);
    });

    it('renders all Auth modal input components', () => {
		expect(wrapper.find(Input)).toHaveLength(2);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('handle close', () => {
		it('handle close is called after click', () => {
			wrapper.find('#iconContainer').simulate('click');
			expect(handleClose).toHaveBeenCalled();
		});
	});
})