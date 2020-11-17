import React, { useState, useEffect } from 'react'
import { NBA_disable } from '../../styles/globalStyle.module.scss'
import { Row, Col, Container } from 'react-grid-system'
import CircleCard from '../CircleCard/CircleCard'
import config from '../../config.json'
import Loader from '../Loader/Loader'
import AppSnackbar from '../Snackbar/Snackbar'
import { RobotoM400_italic } from '../../utils/fonts'
import styled from 'styled-components'
const UpLine = styled.div`
  width: 100vw;
  height: 50px;
`
const RoundedCornerBackground = styled.div`
  position: absolute;
  top: 50px;
  left: 15px;
  height: 10vh;
  width: 15vh;
  @media (max-width: 768px) {
    display: none;
  }
`
const RoudedCorner = styled.div`
  position: absolute;
  top: 50px;
  left: 15px;
  height: 10vh;
  width: 20vh;
  border-top-left-radius: 30px;
  background-color: #ffffff;
  z-index: 2;
  @media (max-width: 768px) {
    display: none;
  }
`

const PlayersContainer = ({ abbreviation, color }) => {
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
            height: '100%',
            display: 'flex',
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
            <Row
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              <UpLine style={{ backgroundColor: color }} />
              <RoundedCornerBackground style={{ backgroundColor: color }} />
              <RoudedCorner />
              <RobotoM400_italic
                style={{
                  padding: 10,
                  textAlign: 'center',
                  width: '100%',
                  fontSize: 30,
                }}
              >
                Players
              </RobotoM400_italic>
              {players.map((player) => {
                return (
                  <Col
                    sm={12}
                    md={6}
                    lg={4}
                    key={player._id}
                    style={{ borderWidth: 1, borderColor: NBA_disable }}
                  >
                    <CircleCard
                      image={player.foto}
                      color={color}
                      price={player.price}
                    />
                  </Col>
                )
              })}
            </Row>
          )}
        </>
      )}
    </>
  )
}

export default PlayersContainer
