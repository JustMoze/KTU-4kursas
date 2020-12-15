import React from 'react'
import styled from 'styled-components'
import { GiStarFormation, GiRoundStar } from 'react-icons/gi'
import {BiCartAlt} from 'react-icons/bi'

const CircleContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  padding-left: 15px;
  align-items: center;
  padding-right: 5px;
  overflow: hidden;
  border-radius: 15px;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc;  /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
  -moz-box-shadow:    3px 3px 5px 6px #ccc;  /* Firefox 3.5 - 3.6 */
  box-shadow:         3px 3px 5px 6px #ccc;  /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
`
const BluredImageContainer = styled.div`
  position: absolute;
  clear: both;
  top: -32%;
  right: 6%;
  width: 100%;
  height: 158%;
`
const Poster = styled.img`
postition: relative;
width: 100%;
height: 100%;
z-index: 5;
overflow: hidden;
margin: 15px 0px;
border-radius: 50%;
border-width: 2px;
border: 2px solid ${props => props.color};
cursor: pointer;
`
const StatItem = styled.div`
  z-index: 5;
  width: 90%;
  height: 30px;
  display: inline-flex;
  margin-bottom: 5px;
  justify-content: center;
  align-items: center;
  transform: skew(20deg);
  background-color: ${props => props.color + "99"};
  border: 2px solid ${props => props.color};
`;
const StatText = styled.h3`
  margin: 0px;
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
`;
const Stat = styled.h3`
  padding-left: 5px;
  margin: 0px;
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
`;
const CartContainer = styled.div`
  position: absolute; 
  right: 10;
  bottom: 10;
  @media (max-width: 900px) {
    right: 10;
    bottom: 10;
  }
  @media (max-width: 700px) {
    right: 10;
    bottom: 10;
  }
`;
function CircleCard({ player, color, logo, handleImgClick, handleBuyClick }) {
  let {foto: image, price, ppg, apg, rpg, _id} = player;
  return (
    <CircleContainer>
      <div style={{width: "60%", height: "100%", zIndex: 2}}>
        <Poster src={image} color={color} onClick={() => handleImgClick(_id)} />
      </div>
      <div style={{paddingLeft: 10, flex: 1, zIndex: 5}}>
        <StatItem color={color} >
          <StatText>PPG</StatText>
          <Stat>{ppg}</Stat>
        </StatItem>
        <StatItem color={color} >
          <StatText>APG</StatText>
          <Stat>{apg}</Stat>
        </StatItem>
        <StatItem color={color} >
          <StatText>RPG</StatText>
          <Stat>{rpg}</Stat>
        </StatItem>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 15,
          right: 15,
          width: 30,
          height: 30,
          cursor: 'pointer',
        }}
      >
        {price > 9000000 && <GiStarFormation size={30} color="#ffe05d" />}
        {price > 6500000 && price <= 9000000 && (
          <GiRoundStar size={30} color="#ffe05d" />
        )}
      </div>
      <div style={{position: 'absolute', left: 5, bottom: 5}}>
          <BiCartAlt size={35} color={color}/>
      </div>
      <BluredImageContainer>
          <img
                src={`https://images.weserv.nl/?url=${logo}&w=600&h=600`}
                height="100%"
                width="100%"
                style={{ opacity: 0.3 }}
            />
      </BluredImageContainer>
    </CircleContainer>
  )
}

export default CircleCard
