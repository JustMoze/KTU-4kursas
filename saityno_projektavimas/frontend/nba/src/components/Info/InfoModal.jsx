import React from 'react'
import Modal from '@material-ui/core/Modal'
import styled from 'styled-components'
import {AiOutlineLogout} from 'react-icons/ai'

const StyledComponent = styled(Modal)`
  position: absolute;
  background-color: #fafafa;
  top: 0;
  bottom: 0;
  right: 0;
  width: 30vw;
  height: 100vh;
  zindex: 10;
`

const ModalContainer = styled.div`
    position: relative;
    width: 30vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #79a3b1;
`
const LogoutContainer = styled.div`
    position: absolute;
    width: 35px;
    height: 35px;
    top: 15px;
    right: 5px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
export default function InfoModal({ open, handleClose }) {
  return (
    <StyledComponent
      open={open}
      style={{ left: '70vw' }}
      onBackdropClick={handleClose}
      onEscapeKeyDown={handleClose}
    >
        <>   
        <ModalContainer>
            <h1 style={{marginTop: 0}}>sveiki</h1>
            <LogoutContainer>
                    <AiOutlineLogout size={35} color="#ffffff"/>
            </LogoutContainer>
        </ModalContainer>
        </>
    </StyledComponent>
  )
}
