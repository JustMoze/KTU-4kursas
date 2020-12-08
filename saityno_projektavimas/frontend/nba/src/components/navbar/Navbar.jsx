import React, { useState } from 'react'
import NavLink from './NavLink'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import './style.module.scss'
import AuthModal from './../Auth/AuthModal'
import { IoIosBasketball } from "react-icons/io";
import { RobotoM400 } from '../../../utils/fonts'
import Match from '../Match/Match'
import InfoModal from '../Info/InfoModal'
import {RiUser6Line} from 'react-icons/ri'

const Container = styled.div`
  background-color: ${(props) => props.color};
  height: 10vh;
  min-height: 80px;
  width: 100vw;
  margin: 0;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
`
const LinkContainer = styled.div`
  position: absolute;
  right: 2vw;
  @media (max-width: 380px) {
    flex-direction: column;
    align-items: flex-end;
  }
`
const LogoContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  cursor: pointer;
  left: 1vw;
  width: 10vw;
  height: 8vh;
  min-height: 60px;
  @media (max-width: 380px) {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 3vw;
    padding-top: 2vh;
  }
  @media (max-width: 768px) {
    width: 20vw;
    margin-left: 5px;
  }
`

const PlayIcon = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 80px;
  cursor: pointer;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    
  }
`;
const BattleContainer = styled.div`
  position: absolute;
  bottom: -80px;
  right: 5px;
  width: 20vw;
  cursor: pointer;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HoverAppereance = styled.div`
  visibility: hidden;
  position: absolute;
  border-radius: 25px;
  right: 85px;
  width: 12vw;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 170px;
  height: 60px;
  bottom: 10px;
  border: 4px solid #E47041;
  ${BattleContainer}:hover & {
    visibility: visible;
  }
`;
const RobotoM400Play = styled(RobotoM400)`
  font-size: 30px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
const InfoIconContainer = styled.div`
  
`
export default function Navbar({
  handleOpen,
  handleLinkClick,
  color,
  ...rest
}) {
  const [authName, setAuthName] = useState('')
  const router = useRouter()
  const [startBattle, setStartBattle] = useState(false);
    // -------------- Personal info -------------------------
  const [openInfoModal, setOpenInfoModal] = useState(false);

  return (
    <>
      <Container color={color}>
        <BattleContainer>
          <div style={{position: "relative", width: '100%', height: 80}}>
            <HoverAppereance onClick={() => setStartBattle(true)}>
                <RobotoM400Play>
                  QUICK GAME
                </RobotoM400Play>
            </HoverAppereance>
            <PlayIcon>
                <IoIosBasketball size={80} color="#B54213"/>
            </PlayIcon>
          </div>
        </BattleContainer>
        <LogoContainer
          onClick={() => {
            router.push('/')
          }}
        >
          <img
            src="https://ak-static.cms.nba.com/wp-content/uploads/logos/leagues/logo-nba.svg"
            height="100%"
          />
        </LogoContainer>
        <LinkContainer>
          <NavLink
            handleClick={() => {
              setAuthName('login')
              handleLinkClick('login')
              handleOpen()
            }}
            name="Login"
          />
          <NavLink
            handleClick={() => {
              setAuthName('register')
              handleLinkClick('register')
              handleOpen()
            }}
            name="Register"
          />
          <NavLink to="/team" name="About" />
        </LinkContainer>
        <div style={{position: "absolute", top: 10, right: 10, width: 25, height: 25, borderRadius: '50%', borderColor: '#ffffff', zIndex: 5, cursor: "pointer", borderWidth: 1, justifyContent: "center", alignItems: "center"}} onClick={() => setOpenInfoModal(true)}>
            <RiUser6Line size={25} color="#ffffff" />
        </div>
      </Container>
      <AuthModal type={authName} color={color} {...rest} />
      <Match color={color} handleClose={() => setStartBattle(false)} open={startBattle}/>
      <InfoModal open={openInfoModal} handleClose={() => setOpenInfoModal(false)}/>
    </>
  )
}
