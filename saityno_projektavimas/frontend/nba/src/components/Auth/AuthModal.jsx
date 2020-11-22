import React from 'react'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import Input from './Input'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import { RiLoginCircleLine } from 'react-icons/ri'
import { AiFillCloseCircle } from 'react-icons/ai'
import { login, register, validateLength } from '../../../utils/Inputs'
import has from 'lodash/has'
import { validateEmail } from './../../../utils/Inputs'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width: '70%',
    borderRadius: 30,
    backgroundColor: '#1e438a',
    '&:hover, &:focus': {
      width: '80%',
      backgroundColor: 'green',
      minHeight: 40,
    },
  },
}))
export const LogoContainer = styled.div`
  background-color: ${(props) => props.color};
  width: 30%;
  height: 60px;
  justify-content: center;
  align-self: center;
  align-items: center;
  display: flex;
  margin-bottom: 25px;
  padding: 3px;
  border-radius: 15px;
`
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
  background-color: #d4d7dd;
  width: 40vw;
  height: 60vh;
  min-height: 500px;
  zindex: 10;
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

const AuthModal = ({
  open,
  handleClose,
  type,
  user,
  handleChange,
  handleSubmit,
  color,
}) => {
  const classes = useStyles()
  const inputs = type.toLowerCase() === 'register' ? register : login
  var errArr = {}

  const ValidateInput = (input) => {
    let { validation } = input
    if (has(validation, 'email')) {
      if (!validateEmail(user[`${input.name}`])) {
        errArr[`${input.name}`] = 1
        return 'Email does not match format'
      } else {
        errArr[`${input.name}`] = 0
      }
    } else if (has(validation, 'min') && has(validation, 'max')) {
      let { min, max } = validation
      let errArrs = validateLength(min, max, user[`${input.name}`], input.name)
      if (errArrs.length > 0) {
        errArr[`${input.name}`] = 1
        return errArrs[0]
      } else {
        errArr[`${input.name}`] = 0
      }
    }
    if (errArr[`${input.name}`] === 0) {
      return ''
    }
  }
  const AllowSubmit = () => {
    let counter = 0
    for (let prop in errArr) {
      if (errArr[prop] === 0) {
        counter++
      }
    }
    if (counter === inputs.length) {
      return true
    } else return false
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
        <IconContainer id="iconContainer" onClick={handleClose}>
          <AiFillCloseCircle size={25} />
        </IconContainer>
        <CenterContainer>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          >
            <LogoContainer color={color}>
              <img
                src="https://ak-static.cms.nba.com/wp-content/uploads/logos/leagues/logo-nba.svg"
                height="100%"
              />
            </LogoContainer>
          </div>
          {inputs.map((input, index) => {
            return (
              <Input
                color={color}
                key={index}
                error={ValidateInput(input) === '' ? false : true}
                message={ValidateInput(input)}
                name={`${type}_${input.name}`}
                value={user[`${input.name}`]}
                handleChange={(e) => handleChange(e)}
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
              style={{ backgroundColor: color, color: '#ffffff' }}
              className={classes.button}
              onClick={() => handleSubmit(type)}
              disabled={!AllowSubmit()}
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
