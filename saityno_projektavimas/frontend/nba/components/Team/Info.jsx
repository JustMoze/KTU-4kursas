import React, { useEffect, useState } from 'react'
import { NBA_white } from '../../styles/globalStyle.module.scss'
import { Row, Col } from 'react-grid-system'
import config from '../../config.json'
import Cover from './Cover'
import Loader from '../Loader/Loader'
import AppSnackbar from '../Snackbar/Snackbar'
import Histogram from '../Charts/Group'
import SiteTable from '../Charts/SiteTable'
import styled from 'styled-components'
const OvalCorner = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 52px;
  width: 100%;
  backgroundColor: ${props => props.color};
  @media (max-width: 768px) {
    display: none;
  }
`;
const MainRow = styled(Row)`
    height: 100%;
    width: 100vw;
    margin-left: 0px !important;
    margin-right: 0px !important;
    position: relative;
`;
const Info = ({ team_id, handleClick }) => {
  const [team, setTeam] = useState()
  const [loading, setLoading] = useState(true)
  const [openSnackbar, setSnackbarOpen] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  const [teamStats, setTeamsStats] = useState()
  useEffect(() => {
    fetch(`${config.API}teams/${team_id}`)
      .then((response) => response.json())
      .then((data) => {
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
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setSnackbarOpen(false)
    }
    setSnackbarOpen(false)
  }
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
              <MainRow>
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
                    minHeight: 450,
                    position: 'relative',
                  }}
                >
                  <OvalCorner>
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        borderTopLeftRadius: 12,
                        backgroundColor: '#ffffff',
                      }}
                    ></div>
                  </OvalCorner>
                  <SiteTable
                    color={team.color}
                    handleClick={handleClick}
                    abbreviation={team.abbreviation}
                  />
                </Col>
              </MainRow>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Info
