import React from 'react'
import styled from 'styled-components'
import { FiInstagram } from 'react-icons/fi'
import { AiOutlineLinkedin, AiFillTwitterCircle } from 'react-icons/ai'
// import { NBA_white } from '../../../styles/globalStyle.module.scss'
import Router from 'next/router'

export const Site_Footer = styled.div`
  background-color: ${(props) => props.color};
  min-height: 80px;
  margin-top: 10px;
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index: 5;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`
 export const IconContainer = styled.div`
  width: 55px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
`
function Footer({ color }) {
  return (
    <Site_Footer color={color}>
      <IconContainer
        id="AiOutlineLinkedin"
        onClick={() =>
          Router.push('https://www.linkedin.com/in/modestas-rimeikis/')
        }
      >
        <AiOutlineLinkedin size={45} color="#ffffff" />
      </IconContainer>
      <IconContainer id="FiInstagram" onClick={() => Router.push('https://www.instagram.com/')}>
        <FiInstagram size={45} color="#ffffff" />
      </IconContainer>
      <IconContainer id="AiFillTwitterCircle" onClick={() => Router.push('https://twitter.com/')}>
        <AiFillTwitterCircle size={45} color="#ffffff" />
      </IconContainer>
    </Site_Footer>
  )
}

export default Footer
