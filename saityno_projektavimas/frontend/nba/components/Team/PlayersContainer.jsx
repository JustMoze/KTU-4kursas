import React, { useState, useEffect } from 'react'
import {
  NBA_blue,
  NBA_red,
  NBA_disable,
  NBA_dark,
} from '../../styles/globalStyle.module.scss'
import { Row, Col, Container } from 'react-grid-system'
import CircleCard from '../CircleCard/CircleCard'
import config from '../../config.json'
import Loader from '../Loader/Loader'
import AppSnackbar from '../Snackbar/Snackbar'

const PlayersContainer = ({ abbreviation }) => {
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
            <Row style={{ width: '100%', height: '100%' }}>
              {players.map((player) => {
                return (
                  <Col
                    sm={12}
                    md={6}
                    lg={4}
                    key={player._id}
                    style={{ borderWidth: 1, borderColor: NBA_disable }}
                  >
                    <CircleCard image={player.foto} />
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
