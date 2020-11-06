import React, { useEffect, useState } from 'react'
import { NBA_dark } from '../../styles/globalStyle.module.scss'
import { Row, Col } from 'react-grid-system'
import PlayersContainer from './PlayersContainer'
import config from '../../config.json'
import Cover from './Cover'
import Loader from '../Loader/Loader'
import AppSnackbar from '../Snackbar/Snackbar'
import Circular from '../Charts/Circular'
import Histogram from '../Charts/Group'

const Info = ({ team_id }) => {
  console.log('team id -> ', team_id)
  const [team, setTeam] = useState()
  const [loading, setLoading] = useState(true)
  const [openSnackbar, setSnackbarOpen] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  const [teamStats, setTeamsStats] = useState()
  useEffect(() => {
    fetch(`${config.API}teams/${team_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('data -> ', data)
        setTeam(data)
        setTeamsStats(ConfigureStatsObject(data))
        setLoading(false)
      })
      .catch((ex) => {
        setSnackbarOpen(true)
        setErrMessage(ex.message)
        setLoading(false)
      })
  }, [team_id])
  console.log('team stats in info', teamStats)
  const ConfigureStatsObject = (data) => {
    return [
      {
        title: 'APG',
        value: data.apg,
        color: '#D4D7DD',
      },
      {
        title: 'RPG',
        value: data.rpg,
        color: '#b9bec9',
      },

      {
        title: 'OPPG',
        value: data.oppg,
        color: '#7e7474',
      },
      {
        title: 'PPG',
        value: data.ppg,
        color: data.color,
      },
    ]
  }
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
            display: 'flex',
            marginTop: '5%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Loader size={50} />
        </div>
      ) : (
        <>
          {openSnackbar ? (
            <AppSnackbar
              open={openSnackbar}
              severity="error"
              message={errMessage}
              handleClose={handleClose}
            />
          ) : (
            <>
              <Row
                style={{
                  marginRight: 10,
                  marginLeft: 10,
                  height: '100%',
                  width: '100vw',
                  position: 'relative',
                }}
              >
                <Col
                  sm={12}
                  md={6}
                  lg={6}
                  style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    overflow: 'hidden',
                  }}
                >
                  <Cover team={team} />
                  <Circular
                    winP={team.winP}
                    record={team.record}
                    height={500}
                    color={team.color}
                    content="Win precentage %"
                  />
                  <Histogram
                    stats={teamStats}
                    color={team.color}
                    height={500}
                    content="Team stats"
                  />
                </Col>
                <Col
                  sm={12}
                  md={6}
                  lg={6}
                  style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    position: 'relative',
                  }}
                >
                  <PlayersContainer abbreviation={team.abbreviation} />
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Info
