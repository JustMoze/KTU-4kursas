import React, { useState, useEffect } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import styled from 'styled-components'
import { NBA_red, NBA_white } from '../../styles/globalStyle.module.scss'
import Loader from '../Loader/Loader'
import config from '../../config.json'
import AppSnackbar from './../Snackbar/Snackbar'

const CustomTr = styled(Tr)`
  height: 50px;
  width: 100%;
  background-color: ${(props) => props.color};
  color: ${NBA_white};
`
const CustomTable = styled(Table)`
  width: 94%;
  margin-left: 3%;
`
const CustomTd = styled(Td)`
  height: 40px;
  border: 1px solid #000000;
  padding-left: 10;
  width: 100% !important;
  text-align: center;
`
const PlayerTh = styled(Th)`
  width: 60%;
`
const CasualTh = styled(Th)`
  width: 20%;
`
const CustomTdPlayer = styled(Td)`
  height: 40px;
  border: 1px solid #000000;
  padding-left: 10px;
  width: 100%;
`
const PlayerRow = styled(Tr)`
  position: relative;
  cursor: pointer;
  background-color: ${(props) =>
    props.price > 9000000 ? '#B9BEC9' : '#ffffff'};
`
function SiteTable({ color, abbreviation }) {
  const [loading, setLoading] = useState(true)
  const [players, setPlayers] = useState()
  const [openSnackbar, setSnackbarOpen] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  useEffect(() => {
    fetch(`${config.API}players/team/${abbreviation}`)
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data)
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
            <CustomTable>
              <Thead>
                <CustomTr color={color}>
                  <PlayerTh>Player</PlayerTh>
                  <Th>Position</Th>
                  <Th>Number</Th>
                </CustomTr>
              </Thead>
              <Tbody>
                {players.map((player) => (
                  <PlayerRow
                    key={player._id}
                    price={player.price}
                    onClick={() => console.log(player.fullName)}
                  >
                    <CustomTdPlayer>{player.fullName}</CustomTdPlayer>
                    <CustomTd>{player.position}</CustomTd>
                    <CustomTd>{player.number}</CustomTd>
                  </PlayerRow>
                ))}
              </Tbody>
            </CustomTable>
          )}
        </>
      )}
    </>
  )
}

export default SiteTable
