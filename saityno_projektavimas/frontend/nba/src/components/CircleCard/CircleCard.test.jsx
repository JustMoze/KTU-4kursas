import React from 'react'
import { shallow, configure } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
import CircleCard from './CircleCard'

// configure({ adapter: new Adapter() })

describe('Circle card component', () => {
    const props = {
        color: '#93abd3',
        image: 'https://logos-world.net/wp-content/uploads/2020/04/Huawei-Logo.png',
        price: 900254000
    }
    it('Renders footer correctly', () => {
      shallow(<CircleCard {...props} />)
    })
  
   
  })