import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-grid-system'
import styled from 'styled-components'
import { RobotoM400_underline, RobotoM500 } from '../../utils/fonts'
import Loader from '../Loader/Loader'
import { RobotoM400 } from './../../utils/fonts'

const CoverContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  min-height: 240px;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px 0px 50px 50px;
`
const StyledRow = styled.div`
  display: flex;
  align-items: center;
  marginbottom: 10 @media (max-width: 768px) {
    display: flex;
    background-color: aqua;
    justify-content: center;
  }
`
const BluredImageContainer = styled.div`
  position: absolute;
  clear: both;
  top: -45%;
  right: -7%;
  width: 70%;
  height: 190%;
  @media (max-width: 768px) {
    display: none;
  }
  zindex: 1;
`
function Cover({ team: { color, logo, full_name, conference } }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (logo) {
      setLoading(false)
    }
  }, [logo])
  return (
    <>
      {loading ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader size={40} />
        </div>
      ) : (
        <>
          <CoverContainer
            style={{ backgroundColor: color, position: 'relative' }}
          >
            <Row style={{ width: '100%', zIndex: 2 }}>
              <Col
                sm={12}
                md={6}
                lg={6}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <div style={{ height: '100%', width: '80%' }}>
                  <img
                    src={`https://images.weserv.nl/?url=${logo}&w=400&h=400`}
                    style={{ transform: 1.5 }}
                    width="100%"
                    height="100%"
                  />
                </div>
              </Col>
              <Col>
                <StyledRow style={{ marginTop: 25, zIndex: 3 }}>
                  <RobotoM500>{full_name}</RobotoM500>
                </StyledRow>
                <StyledRow style={{ marginBottom: 10, zIndex: 3 }}>
                  <RobotoM400>Conference: {conference}</RobotoM400>
                </StyledRow>
              </Col>
            </Row>
            <BluredImageContainer>
              <img
                src={`https://images.weserv.nl/?url=${logo}&w=750&h=750`}
                height="100%"
                width="100%"
                style={{ opacity: 0.3 }}
              />
            </BluredImageContainer>
          </CoverContainer>
        </>
      )}
    </>
  )
}

export default Cover
