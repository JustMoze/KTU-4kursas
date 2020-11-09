import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import Input from './Input'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import { RiLoginCircleLine } from 'react-icons/ri'
import { AiFillCloseCircle } from 'react-icons/ai'
import { NBA_blue } from '../../styles/globalStyle.module.scss'
import { login, register } from '../../utils/Inputs'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width: '70%',
    borderRadius: 30,
    backgroundColor: NBA_blue,
    '&:hover, &:focus': {
      width: '80%',
      backgroundColor: 'green',
      minHeight: 40,
    },
  },
}))

// const InputContainer = styled.div`
//   width: 100%;
//   padding-right: 20px;
//   padding-left: 20px;
// `

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: relative;
  border-radius: 10px;
`
const CenterContainer = styled.div`
  padding-top: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
`
const CustomModal = styled(Modal)`
  position: absolute;
  width: 40vw;
  height: 60vh;
  min-height: 500px;
  zindex: 10;
  padding: 10px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`
const IconContainer = styled.div`
  position: absolute;
  top: 5px;
  cursor: pointer;
  right: 5px;
  min-width: 25px;
  min-height: 25px;
`

const AuthModal = ({ open, handleClose, type }) => {
  const classes = useStyles()
  const [allowSubmit, setAllowSubmit] = useState(false)
  const inputs = type.toLowerCase() === 'register' ? register : login
  const [user, setUser] = useState({})

  const ValidateInput = (input) => {
    return false
  }

  const HandleUserCredentialChange = (e) => {
    let { value, name } = e.target
    setUser({ ...user, [name]: value })
  }

  return (
    <CustomModal
      open={open}
      onBackdropClick={handleClose}
      onEscapeKeyDown={handleClose}
      onClose={handleClose}
      style={{
        top: type.toLowerCase() === 'register' ? '10vh' : '25vh',
        left: '30vw',
        minHeight: type.toLowerCase() === 'register' ? '80vh' : 400,
      }}
    >
      <ModalContainer>
        <IconContainer onClick={handleClose}>
          <AiFillCloseCircle size={25} />
        </IconContainer>
        <CenterContainer>
          {inputs.map((input, index) => {
            return (
              <Input
                key={index}
                error={ValidateInput(input)}
                message="Need to fill it"
                name={input.name}
                value={user[`${input.name}`]}
                handleChange={(e) => HandleUserCredentialChange(e)}
                type={input.type}
              />
            )
          })}
          <div
            style={{
              width: '100%',
              marginTop: 20,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              disabled={!allowSubmit}
              startIcon={<RiLoginCircleLine size={25} />}
            >
              Save
            </Button>
          </div>
        </CenterContainer>
      </ModalContainer>
    </CustomModal>
  )
}

export default AuthModal
