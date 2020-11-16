import React, { useState, useEffect } from 'react'
import { Thead, Tbody, Tr, Th } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import styled from 'styled-components'
import { NBA_red, NBA_white } from '../../styles/globalStyle.module.scss'
import { TiChevronRight, TiChevronLeft } from 'react-icons/ti'
import Loader from '../Loader/Loader'
import config from '../../config.json'
import AppSnackbar from './../Snackbar/Snackbar'
import {
  CustomTd,
  CustomTable,
  CustomTr,
  CasualTh,
  CustomTdPlayer,
} from './../../utils/Chart'

const PlayerRow = styled(Tr)`
  position: relative;
  cursor: pointer;
  background-color: ${(props) =>
    props.price > 9000000 ? '#B9BEC9' : '#ffffff'};
  &:hover {
    background-color: ${(props) => props.color};
    color: ${NBA_white};
  }
`
const ArrowContainer = styled.div`
  width: 45px;
  height: 45px;
  cursor: pointer;
  margin-left: 15px;
  border-radius: 50%;
  justifycontent: center;
  align-items: center;
  background-color: #b9bec9;
  &:hover {
    background-color: ${(props) => (props.enable ? props.color : '#b9bec9')};
    color: ${NBA_white};
  }
`
const CustomBody = styled(Tbody)`
  margin-top: 25px;
`
function SiteTable({ color, abbreviation, handleClick }) {
  const [loading, setLoading] = useState(true)
  const [chartPlayers, setChartPlayers] = useState()
  const [number, setNumber] = useState(0)
  const [players, setPlayers] = useState()
  const [allowLeft, setAllowLeft] = useState(true)
  const [allowRight, setAllowRight] = useState(true)
  const [openSnackbar, setSnackbarOpen] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  useEffect(() => {
    fetch(`${config.API}players/team/${abbreviation}`)
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data)
        setChartPlayers(data.slice(0, 10))
        setLoading(false)
      })
      .catch((ex) => {
        setSnackbarOpen(true)
        setErrMessage(ex.message)
        setLoading(false)
      })
  }, [abbreviation])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setSnackbarOpen(false)
    }
    setSnackbarOpen(false)
  }
  const handleArrowClick = (side) => {
    switch (side) {
      case 'left':
        let newNumber = number - 1
        if (newNumber > -1) {
          setNumber(newNumber)
          setChartPlayers(players.slice(newNumber * 10, newNumber * 10 + 9))
          if (allowRight === false) {
            setAllowRight(true)
          }
          if (newNumber === 0) {
            setAllowLeft(false)
          }
        } else {
          setAllowLeft(false)
        }
        break
      case 'right':
        let newNumberRight = number + 1
        if (newNumberRight < players.length / 10) {
          if (newNumberRight * 10 + 9 > players.length) {
            setChartPlayers(players.slice(newNumberRight * 10, players.length))
            setNumber(newNumberRight)
            setAllowLeft(true)
            setAllowRight(false)
          } else {
            setChartPlayers(players.slice(newNumberRight * 10, players.length))
            setNumber(newNumberRight)
            setAllowLeft(true)
          }
        } else if (
          newNumberRight ===
            (players.length - findResidue(players.length)) / 10 &&
          findResidue(players.length) > 0
        ) {
          setNumber(newNumberRight)
          setAllowRight(false)
          setChartPlayers(
            players.slice(
              players.length - findResidue(players.length),
              players.length
            )
          )
        }
      default:
        break
    }
  }
  const findResidue = (number) => {
    return number % 10
  }
  console.log('number', number)
  return (
    <>
      {loading ? (
        <div
          style={{
            width: '100%',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader size={40} />
        </div>
      ) : (
        <>
          {openSnackbar ? (
            <AppSnackbar
              message={errMessage}
              open={openSnackbar}
              handleClose={handleClose}
              severity="error"
            />
          ) : (
            <>
              <CustomTable>
                <Thead>
                  <CustomTr color={color}>
                    <Th>Player</Th>
                    <CasualTh>Position</CasualTh>
                    <CasualTh>Number</CasualTh>
                  </CustomTr>
                </Thead>
                <CustomBody>
                  {chartPlayers.map((player) => {
                    return (
                      <PlayerRow
                        key={player._id}
                        price={player.price}
                        color={color}
                        onClick={() => handleClick(player._id)}
                      >
                        <CustomTdPlayer>{player.fullName}</CustomTdPlayer>
                        <CustomTd>{player.position}</CustomTd>
                        <CustomTd>{player.number}</CustomTd>
                      </PlayerRow>
                    )
                  })}
                </CustomBody>
              </CustomTable>
              <div
                style={{
                  position: 'relative',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  display: 'flex',
                  float: 'right',
                  marginTop: '1%',
                  marginRight: '3.3%',
                  width: '50%',
                  height: 50,
                }}
              >
                <ArrowContainer
                  color={color}
                  enable={number > 0 ? true : false}
                  onClick={() => handleArrowClick('left')}
                >
                  {number !== 0 && <TiChevronLeft size={45} color="#ffffff" />}
                </ArrowContainer>
                <ArrowContainer
                  color={color}
                  enable={allowRight}
                  onClick={() => handleArrowClick('right')}
                >
                  {allowRight && <TiChevronRight size={45} color="#ffffff" />}
                </ArrowContainer>
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}

export default SiteTable
