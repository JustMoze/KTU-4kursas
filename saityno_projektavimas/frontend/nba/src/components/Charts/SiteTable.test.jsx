import React from 'react'
import { shallow, mount } from 'enzyme'
import SiteTable, { ArrowContainer, ArrowsRow, PlayerRow } from './SiteTable'
import toJson from 'enzyme-to-json'
import renderer from 'react-test-renderer'
import {myFetch} from './fetch'
import 'jest-styled-components'
import AuthModal from '../Auth/AuthModal'

jest.mock('./fetch', () => {
  return {
    myFetch: jest.fn(),
  }
})

// describe('Fetching', () => {
//   afterEach(() => {
//     jest.clearAllMocks()
//   })
//   it('should fetch data correctly', async () => {
//     const mResponse = {
//       data: {
//         _id: '5f62427b92c3b8345482f4b2',
//         fullName: 'OG Anunoby',
//         position: 'F',
//         number: '#3',
//         weight: '232 lbs',
//         height: '6 ft 7in',
//         age: '23 years',
//         mpg: 23.3,
//         fg: 48,
//         threePt: 36.5,
//         ft: 65,
//         ppg: 7.8,
//         rpg: 3.5,
//         bpg: 0.4,
//         apg: 1,
//         team: 'TOR',
//         _v: 0,
//         price: 4318056,
//         foto:
//           'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628384.png',
//         videoId: 't0aLmBCXoqA',
//       },
//     }
//     const handleClick = jest.fn();
//     const initProps = {
//         color: '#ffffff',
//         abbreviation: 'UTA',
//         handleClick: handleClick,
//     };
//     const mProps = { id: 1 }
//     myFetch.mockResolvedValueOnce(mResponse)
//     const wrapper = mount(<AuthModal {...initProps}></AuthModal>)
//     expect(wrapper.exists).toBeTruthy()
//     await act(async () => {
//       await new Promise((resolve) => setTimeout(resolve, 0))
//     })
//     wrapper.update()
//     expect(wrapper.find('PlayerRow').length).toBeGreaterThanOrEqual(1);
//     expect(myFetch).toBeCalledWith(1)
//   })
// });

describe('SiteTable component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const props = {
    color: '#ffffff',
    abbreviation: 'UTA',
    handleClick: jest.fn(),
  }
  const price = 9000001
  it('Renders footer correctly', () => {
    let wrapper = shallow(<SiteTable {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('ArrowContainer works', () => {
    const arrContainer = renderer
      .create(<ArrowContainer color={props.color} enable={true} />)
      .toJSON()
    expect(arrContainer).toHaveStyleRule('background-color', props.color, {
      modifier: ':hover',
    })
  })
  test('PlayerRow works', () => {
    const playerRow = renderer
      .create(<PlayerRow color={props.color} price={price} />)
      .toJSON()
    expect(playerRow).toHaveStyleRule('background-color', props.color, {
      modifier: ':hover',
    })
  })
  test('ArrowsRow works', () => {
    const arrContainer = renderer
      .create(<ArrowsRow color={props.color} />)
      .toJSON()
    expect(arrContainer).toHaveStyleRule('background-color', props.color, {
      media: '(max-width: 768px)',
    })
  })

//   it('map function checking', () => {
//     expect(wrapper.find(PlayerRow)).to.have.length()
//     expect(wrapper.find('tbody').children().find('tr')).to.have.length(
//       cats.length
//     )
//   })
})
