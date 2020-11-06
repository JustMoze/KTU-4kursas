import React from 'react'
import styled from 'styled-components'
import { NBA_white, NBA_dark } from '../../styles/globalStyle.module.scss'

const CircleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Poster = styled.img`
  width: 90%;
  height: 92%;
  margin-top: 5px;
  ${'' /* border-radius: 50%; */}
`

function CircleCard({ image, fullName, number, position }) {
  // image = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628384.png";
  // fullName = "OG Anunoby";
  // position = "F";
  // number = "#3";
  return (
    <CircleContainer>
      <Poster src={image} />
    </CircleContainer>
  )
}

export default CircleCard
