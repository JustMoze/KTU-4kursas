import React from 'react'
import styled from 'styled-components'
import { GiStarFormation, GiRoundStar } from 'react-icons/gi'
import { colors } from '@material-ui/core'

const CircleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const StarContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
  background-color: '#ea86b6';
`
const Poster = styled.img`
postition: relative;
width: 85%;
height: 85%;
margin-top: 5px;
border-radius: 40%;
border-width: 2px;
border: 2px solid ${props => props.color};
cursor: pointer;
`

function CircleCard({ image, color, price }) {
  return (
    <CircleContainer>
      <Poster src={image} color={color}/>
      <div
        style={{
          position: 'absolute',
          top: 5,
          right: 5,
          width: 30,
          height: 30,
          cursor: 'pointer',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {price > 9000000 && <GiStarFormation size={30} color="#ffe05d" />}
        {price > 6500000 && price <= 9000000 && (
          <GiRoundStar size={30} color="#ffe05d" />
        )}
      </div>
    </CircleContainer>
  )
}

export default CircleCard
