import React, { useState } from 'react'
import NavLink from './NavLink'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { NBA_blue } from '../../styles/globalStyle.module.scss'
import './style.module.scss'
import AuthModal from './../Auth/AuthModal'

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
`
export default function Navbar({
  handleOpen,
  handleLinkClick,
  color,
  ...rest
}) {
  const [authName, setAuthName] = useState('')
  const router = useRouter()
  return (
    <>
      <Container color={color}>
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
      </Container>
      <AuthModal type={authName} color={color} {...rest} />
    </>
  )
}
